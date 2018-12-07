<?php

namespace App\Jobs;

use App\Post;
use App\Utils\InstagramHelper;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class UploadPhoto implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 2;

    /**
     * @var Post
     */
    private $post;

    /**
     * UploadPhoto constructor.
     * @param Post $post
     */
    public function __construct(Post $post)
    {
        $this->post = $post;
    }

    public function handle()
    {
        if(InstagramHelper::uploadPhoto($this->post))
            $this->deletePost();
    }

    private function deletePost() {
        try {
            $this->post->delete();
        } catch (\Exception $e){
            //TODO
        }
    }
}
