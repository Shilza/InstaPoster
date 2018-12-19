<?php

namespace App\Utils;

use InstagramAPI\Instagram;


class ExtendedInstagram extends Instagram {

    /**
     * @param $username
     * @param $password
     */
    public function changeUser( $username, $password ) {
        $this->_setUser( $username, $password );
    }
}