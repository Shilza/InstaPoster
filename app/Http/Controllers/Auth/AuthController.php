<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\InstagramProfile;
use App\Mail\RegisterSuccessfully;
use App\Notifications\RegisterSuccess;
use App\User;
use App\Utils\InstagramHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['jwt.auth'], ['except' => ['login', 'register', 'refresh']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['message' => 'Incorrect login or password'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'expires_in' => Carbon::now()->timestamp + auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
            'instagramProfiles' => $this->getValidInstagramProfiles()
        ]);
    }

    private function getValidInstagramProfiles()
    {
        $validProfiles = [];
        foreach (User::find(auth()->user()->id)->instagramProfiles as $item) {
            $item->makeVisible('password')->toArray();

            //if (InstagramHelper::checkProfile($item['login'], $item['password'])) {

                unset($item['password']);
            array_push($validProfiles, $item);
            //} else
                //InstagramProfile::where('login', $item['login'])->first()->delete();
        }

        return $validProfiles;
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json([
            'user' => auth()->user(),
            'instagramProfiles' => $this->getValidInstagramProfiles()
        ], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            return response()->json([
                'access_token' => auth()->refresh(),
                'expires_in' => Carbon::now()->timestamp + auth()->factory()->getTTL() * 60
            ]);
        } catch (TokenExpiredException $e) {
            return response()->json(['message' => 'token expired'], 401);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|max:32|confirmed',
            'instagramLogin' => 'required|string|max:255',
            'instagramPassword' => 'required|string|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }

        if(InstagramProfile::where('login', $request->instagramLogin)->first())
            return response()->json([
                'message' => ['Instagram' => 'Instagram profile already exists']
            ], 400);

        if (InstagramHelper::checkProfile($request->instagramLogin, $request->instagramPassword)) {
            $password = Hash::make($request->password);

            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => $password
            ]);

            InstagramProfile::create([
                'id' => $user->id,
                'login' => $request->instagramLogin,
                'password' => $request->instagramPassword
            ]);

            $user->notify(new RegisterSuccess());

            return response()->json([
                'message' => 'Registration completed successfully. Please Log in'
            ], 200);
        }

        return response()->json([
            'message' => ['Instagram' => 'Instagram login or password invalid']
        ], 400);
    }
}