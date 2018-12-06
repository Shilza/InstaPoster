<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PasswordReset
 * @package App
 * @property $email
 * @property $token
 */
class PasswordReset extends Model
{
    const UPDATED_AT = null;
    protected $dateFormat = 'U';

    protected $fillable = ['email', 'token'];
}
