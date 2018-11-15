<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InstagramProfile extends Model
{
    protected $fillable = ['id', 'login', 'password'];

    protected  $hidden = ['password'];

    const UPDATED_AT = null;
    const CREATED_AT = null;
}
