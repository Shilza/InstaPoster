<?php

namespace App\Utils;

use InstagramAPI\Instagram;
use InstagramAPI\Media\Photo\InstagramPhoto;

class InstagramHelper
{
    /**
     * @param $login
     * @param $password
     * @return bool
     */
    public static function checkProfile($login, $password){
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new \InstagramAPI\Instagram(false, false);
            $instagram->login($login, $password);
            return true;
        } catch (\Exception $e){
            return false;
        }
    }

    /**
     * @param $post
     * @throws \Exception
     */
    public static function uploadPhoto($post) {
        Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
        $instagram = new Instagram(false, false);

        $profile = $post->profile;
        $profile->makeVisible('password')->toArray();

        $instagram->login($profile->login, $profile->password);
        $photo = new InstagramPhoto($post->image);

        $instagram->timeline->uploadPhoto($photo->getFile(), [
            'caption' => $post->comment
        ]);
    }
}