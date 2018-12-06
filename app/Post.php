<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * @package App
 * @property $comment
 * @property $image
 * @property $login
 * @property $post_time
 */
class Post extends Model
{
    protected $dateFormat = 'U';

    protected $fillable = ['login', 'post_time', 'comment', 'image'];

    protected $hidden = ['password', 'created_at', 'updated_at'];

    public function profile()
    {
        return $this->belongsTo('App\InstagramProfile', 'login', 'login');
    }
}
