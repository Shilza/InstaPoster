<?php

namespace App\Http\Controllers;

use App\InstagramProfile;
use App\Jobs\UploadPhoto;
use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    const HALF_A_YEAR = 16070400;

    public function __construct()
    {
        $this->middleware(['jwt.auth']);
    }

    /**
     * @param $code_base64
     * @return string
     */
    private function storeImage($code_base64)
    {
        $code_base64 = str_replace('data:image/jpeg;base64,', '', $code_base64);
        $image = base64_decode($code_base64);

        $time = time();
        $imagePath = 'post_images/' . auth()->user()['id'] . '/' . str_random(6) . $time . '.jpeg';

        Storage::disk('local')->makeDirectory('public/post_images/' . auth()->user()['id']);
        Storage::disk('local')->put("public/$imagePath", $image);

        return "storage/$imagePath";
    }

    /**
     * @param $item
     * @param $poster
     * @return null
     */
    private function createPost($item, $poster)
    {
        $maxPostTime = time() + static::HALF_A_YEAR;

        $validator = Validator::make($item, [
            'comment' => 'max:1000',
            'post_time' => "required|int|min:0|max:$maxPostTime"
        ]);
        if (!$validator->fails() && $this->posterValid($poster)) {
            $path = $this->storeImage($item['image']);
            return Post::create([
                'user_id' => auth()->user()['id'],
                'login' => $poster,
                'comment' => $item['comment'],
                'post_time' => $item['post_time'],
                'image' => $path
            ]);
        }

        return null;
    }

    /**
     * @param $poster
     * @return bool
     */
    private function posterValid($poster)
    {
        if (InstagramProfile::where('id', auth()->user()['id'])
            ->where('login', $poster)->first())
            return true;

        return false;
    }

    /**
     * @param Post $post
     */
    private function createUploadJob(Post $post)
    {
        $delay = $post->post_time - now()->timestamp;
        if ($post instanceof Post && $delay > 0)
            UploadPhoto::dispatch($post)->delay($delay);
    }

    /**
     * @param $id
     * @return bool
     */
    private function checkPostIdByUser($id)
    {
        if ($post = Post::whereId($id)->first()) {
            foreach (User::find(auth()->user()['id'])->instagramProfiles as $profile)
                if ($profile->login === $post->login)
                    return true;
        }

        return false;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array|min:1',
            'poster' => 'required|string|max:255'
        ]);
        if (!$validator->fails()) {
            if ($imagesCount = count($request->images)) {
                foreach ($request->images as $item)
                    if ($post = $this->createPost($item, $request->poster)) {
                        $this->createUploadJob($post);
                        $imagesCount--;
                    }

                return response()->json([
                    'message' => count($request->images) - $imagesCount . '/' . count($request->images) . ' images submitted successfully'
                ], 200);
            }
        }

        return response()->json(['message' => 'Incorrect request'], 400);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|int'
        ]);
        if (!$validator->fails()) {
            if ($this->checkPostIdByUser($request->id) &&
                Post::whereId($request->id)->delete()) {

                return response()->json([
                    'message' => 'Post deleted successfully'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Invalid post id'
                ], 400);
            }
        } else {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $maxPostTime = time() + static::HALF_A_YEAR;

        $validator = Validator::make($request->all(), [
            'id' => 'required|int',
            'login' => 'required|string|max:255',
            'comment' => 'string|null|max:1000',
            'post_time' => "required|int|min:0|max:$maxPostTime"
        ]);
        if (!$validator->fails()) {
            if ($this->posterValid($request->login) &&
                $post = Post::where('id', $request->id)
                    ->where('login', $request->login)
                    ->first()) {

                $post->comment = $request->comment;
                $post->post_time = $request->post_time;

                $post->save();

                return response()->json([
                    'message' => 'Post updated successfully'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Invalid post id'
                ], 400);
            }
        } else {
            return response()->json([
                "error" => 'Validation error',
                "message" => $validator->errors(),
            ], 422);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        $user = User::find(auth()->user()['id']);
        $posts = [];

        foreach ($user->instagramProfiles as $profile) {
            $post = array_merge(
                ['profile' => $profile->login],
                ['posts' => $profile->posts]
            );
            array_push($posts, $post);
        }

        return response()->json($posts, 200);
    }
}
