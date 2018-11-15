<?php

namespace App\Http\Controllers;

use App\InstagramProfile;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware(['jwt.auth']);
    }

    private function storeImage($code_base64)
    {
        $code_base64 = str_replace('data:image/jpeg;base64,', '', $code_base64);
        $image = base64_decode($code_base64);

        $time = time();
        $imagePath = 'public/post_images/' . auth()->user()['id'] . '/' . str_random(6) . $time . '.jpeg';

        Storage::disk('local')->makeDirectory('public/post_images/' . auth()->user()['id']);
        Storage::disk('local')->put($imagePath, $image);

        return $imagePath;
    }

    private function createPost($item, $poster)
    {
        $validator = Validator::make($item, [
            'comment' => 'max:1000',
            'post_time' => 'required|int|min:0|max:2147483647'
        ]);
        if (!$validator->fails() && $this->posterValid($poster)) {
            $path = $this->storeImage($item['image']);
            Post::create([
                'user_id' => auth()->user()['id'],
                'login' => $poster,
                'comment' => $item['comment'],
                'post_time' => $item['post_time'],
                'image' => $path
            ]);
        }
    }

    private function posterValid($poster)
    {
        if (InstagramProfile::where('id', auth()->user()['id'])
            ->where('login', $poster)->first())
            return true;

        return false;
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array|min:1',
            'poster' => 'required|string|max:255'
        ]);
        if (!$validator->fails())
            if (count($request->images)) {
                foreach ($request->images as $item)
                    $this->createPost($item, $request->poster);

                return response()->json(['message' => 'Submitted successfully'], 200);
            }

        return response()->json(['message' => 'Incorrect request'], 400);
    }

    public function delete(Request $request)
    {

    }

    public function update(Request $request)
    {

    }

    public function get(Request $request)
    {

    }
}
