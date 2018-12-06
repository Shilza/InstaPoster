<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class InstagramProfile
 * @package App
 * @property $id
 * @property $login
 * @property $password
 */
class InstagramProfile extends Model
{
    protected $fillable = ['id', 'login', 'password'];

    protected  $hidden = ['password'];

    const UPDATED_AT = null;
    const CREATED_AT = null;

    public function posts(){
        return $this->hasMany('App\Post', 'login', 'login');
    }
}
