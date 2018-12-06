<?php

namespace App\Jobs;

use App\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use InstagramAPI\Instagram;

class UploadPhoto implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Instagram
     */
    protected $instagram;

    /**
     * @var Post
     */
    private $post;

    /**
     * UploadPhoto constructor.
     * @param $instagram
     * @param Post $post
     */
    public function __construct(Instagram $instagram, Post $post)
    {
        $this->instagram = $instagram;
        $this->post = $post;
    }

    /**
     * @throws \Exception
     */
    public function handle()
    {
        $photo = new \InstagramAPI\Media\Photo\InstagramPhoto($this->post->image);
        $this->instagram->timeline->uploadPhoto($photo->getFile(), [
            'caption' => $this->post->comment
        ]);
    }
}
