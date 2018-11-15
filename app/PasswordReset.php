<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    const UPDATED_AT = null;
    protected $dateFormat = 'U';

    protected $fillable = ['email', 'token'];
}
