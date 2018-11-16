<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $dateFormat = 'U';

    protected $fillable = ['login', 'post_time', 'comment', 'image'];

    protected $hidden = ['password', 'created_at', 'updated_at'];

}
