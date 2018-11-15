<?php

namespace App\Http\Controllers;

use App\InstagramProfile;
use App\Utils\InstagramHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        if(InstagramHelper::checkProfile(
                $request->instagramName, $request->instagramPassword
        )){
            $profile = InstagramProfile::create([
                'id' => auth()->user()['id'],
                'login' => $request->instagramName,
                'password' => $request->instagramPassword
            ]);

            return response()->json([
                'message' => 'Instagram profile successfully added',
                'profile' => $profile
            ], 200);
        }

        return response()->json([
            'message' => 'Incorrect login or password'
        ], 400);
    }
}
