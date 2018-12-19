<?php

namespace App\Http\Controllers;

use App\InstagramProfile;
use App\Utils\InstagramHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use InstagramAPI\Exception\ChallengeRequiredException;
use InstagramAPI\Exception\InstagramException;

class InstagarmProfileController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request){
        $validator = Validator::make($request->all(), [
            'instagramName' => 'required|string|max:255',
            'instagramPassword' => 'required|string|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }
        if(InstagramProfile::where('login', $request->instagramName)->first())
            return response()->json([
                'message' => 'Profile already added'
            ], 400);

        try {
            if (InstagramHelper::checkProfile(
                $request->instagramName, $request->instagramPassword
            )) {
                $profile = InstagramProfile::create([
                    'id' => auth()->user()['id'],
                    'login' => $request->instagramName,
                    'password' => $request->instagramPassword,
                    'avatar' => InstagramHelper::getProfileImage(
                        $request->instagramName, $request->instagramPassword
                    )
                ]);

                return response()->json([
                    'message' => 'Instagram profile successfully added',
                    'profile' => $profile
                ], 200);
            }
        } catch (InstagramException $e){
            var_dump($e);
            return response()->json([
                'message' => 'CRE'
            ], 400);
        } catch(\Exception $e) {
            return response()->json([
                'message' => 'Incorrect login or password'
            ], 400);
        }

        return response()->json([
            'message' => 'Incorrect login or password'
        ], 400);
    }

    public function delete(Request $request){
        $validator = Validator::make($request->all(), [
            'login' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }
        if(InstagramProfile::where('id', auth()->user()['id'])->count() <= 1)
            return response()->json([
                'message' => 'Profile cannot be deleted, at least one account must be linked'
            ], 400);

        $profile = InstagramProfile::where('login', $request->login)->first();
        if($profile && $profile->delete())
            return response()->json([
                'message' => 'Profile successfully deleted',
            ], 200);
        else
            return response()->json([
                'message' => 'Invalid data'
            ], 400);
    }
}
