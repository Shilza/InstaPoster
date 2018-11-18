<?php

namespace App\Utils;


class InstagramHelper
{
    public static function checkProfile($login, $password){
        try {
            \InstagramAPI\Instagram::$allowDangerousWebUsageAtMyOwnRisk = true;
            $instagram = new \InstagramAPI\Instagram(false, false);
            $instagram->login($login, $password);
            return true;
        } catch (\InvalidArgumentException $e){
            return false;
        }
    }
}