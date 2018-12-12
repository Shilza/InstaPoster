<?php

namespace App\Utils;

use InstagramAPI\Instagram;
use InstagramAPI\Media\Photo\InstagramPhoto;

class InstagramHelper
{

    const STATUS_OK = 200;


    public static function getProfileImage($login, $password) {
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new Instagram(false, false);
            $instagram->login($login, $password);

            return $instagram->account->getCurrentUser()->getUser()->getProfilePicUrl();
        } catch (\Exception $e){
            return null;
        }
    }

    /**
     * @param $login
     * @param $password
     * @return bool
     */
    public static function checkProfile($login, $password){
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new Instagram(false, false);
            $instagram->login($login, $password);
            return true;
        } catch (\Exception $e){
            return false;
        }
    }

    /**
     * @param $post
     * @return bool
     */
    public static function uploadPhoto($post) {
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new Instagram(false, false);

            $profile = $post->profile;
            $profile->makeVisible('password')->toArray();

            $instagram->login($profile->login, $profile->password);

            $photo = new InstagramPhoto(static::getPath($post->image));

            $response = $instagram->timeline->uploadPhoto($photo->getFile(), [
                'caption' => $post->comment
            ]);

            if ($response->getHttpResponse()->getStatusCode() == static::STATUS_OK)
                return true;

        } catch (\Exception $e) {
            //TODO: mark post as unposted
        }

        return false;
    }

    /**
     * @param $image
     * @return string
     */
    private static function getPath($image) {
        $sb = substr($image, 8);
        return "storage/app/public/" . $sb;
    }


}