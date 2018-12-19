<?php

namespace App\Utils;

use InstagramAPI\Exception\ChallengeRequiredException;
use InstagramAPI\Instagram;
use InstagramAPI\Media\Photo\InstagramPhoto;

class InstagramHelper
{

    const STATUS_OK = 200;

    /**
     * @param $login
     * @param $password
     * @return null|string
     */
    public static function getProfileImage($login, $password)
    {
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new Instagram(false, false);
            $instagram->login($login, $password);

            return $instagram->account->getCurrentUser()->getUser()->getProfilePicUrl();
        } catch (\Exception $e) {
            return null;
        }
    }

    private static function readln( $prompt ) {
        if ( PHP_OS === 'WINNT' ) {
            echo "$prompt ";

            return trim( (string) stream_get_line( STDIN, 6, "\n" ) );
        }

        return trim( (string) readline( "$prompt " ) );
    }

    const VERIFICATION_METHOD = 0;

    /**
     * @param $login
     * @param $password
     * @return bool
     */
    public static function checkProfile($login, $password)
    {
        try {
            Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new ExtendedInstagram();
            $instagram->login($login, $password);
            return true;
        } catch (ChallengeRequiredException $exception) {

            $response = $exception->getResponse();

            if ($response->getErrorType() === 'checkpoint_challenge_required') {

                sleep(3);

                $checkApiPath = substr( $response->getChallenge()->getApiPath(), 1);
                $customResponse = $instagram->request($checkApiPath)
                    ->setNeedsAuth(false)
                    ->addPost('choice', static::VERIFICATION_METHOD)
                    ->addPost('_uuid', $instagram->uuid)
                    ->addPost('guid', $instagram->uuid)
                    ->addPost('device_id', $instagram->device_id)
                    ->addPost('_uid', $instagram->account_id)
                    ->addPost('_csrftoken', $instagram->client->getToken())
                    ->getDecodedResponse();
            } else {
                return false;
            }

            try {
                if ($customResponse['status'] === 'ok' && $customResponse['action'] === 'close') {
                    echo 'Checkpoint bypassed';
                }

                $code = static::readln( 'Code that you received via ' . ( static::VERIFICATION_METHOD ? 'email' : 'sms' ) . ':' );
                $instagram->changeUser( $login, $password );
                $customResponse = $instagram->request($checkApiPath)
                    ->setNeedsAuth(false)
                    ->addPost('security_code', $code)
                    ->addPost('_uuid', $instagram->uuid)
                    ->addPost('guid', $instagram->uuid)
                    ->addPost('device_id', $instagram->device_id)
                    ->addPost('_uid', $instagram->account_id)
                    ->addPost('_csrftoken', $instagram->client->getToken())
                    ->getDecodedResponse();

                if ($customResponse['status'] === 'ok' &&
                    (int) $customResponse['logged_in_user']['pk'] === (int) $instagram->account->getCurrentUser()->getUser()->getPk()) {
                    echo 'Finished, logged in successfully! Run this file again to validate that it works.';
                } else {
                    echo "Probably finished...\n";
                    var_dump( $customResponse );
                }
            } catch (\Exception $ex ) {
                echo $ex->getMessage();
            }

            return false;
        } catch (\Exception $e) {
           return false;
        }
    }

    /**
     * @param $post
     * @return bool
     */
    public static function uploadPhoto($post)
    {
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
    private static function getPath($image)
    {
        $sb = substr($image, 8);
        return "storage/app/public/" . $sb;
    }


}