<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes;

    const UPDATED_AT = null;
    protected $dateFormat = 'U';
    protected $dates = ['deleted_at'];

    protected $fillable = [
        'username', 'email', 'password', 'refresh_token'
    ];

    protected $hidden = ['password', 'created_at', 'deleted_at', 'email'];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function instagramProfiles(){
        return $this->hasMany('App\InstagramProfile', 'id', 'id');
    }
}
