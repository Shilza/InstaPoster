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

    private function createPost($item){
        $validator = Validator::make($item, [
            'comment' => 'max:1000',
            'post_time' => 'required|int|min:0|max:2147483647',
            'poster' => 'required|string|max:255'
        ]);
        if (!$validator->fails() && $this->posterValid($item['poster'])) {
            $path = $this->storeImage($item['image']);
            Post::create([
                'user_id' => auth()->user()['id'],
                'login' => $item['poster'],
                'comment' => $item['comment'],
                'post_time' => $item['post_time'],
                'image' => $path
            ]);
            return true;
        }

        return false;
    }

    private function posterValid($poster){
        if(InstagramProfile::where('userId', auth()->user()['id'])
            ->where('login', $poster))
            return true;

        return false;
    }

    public function create(Request $request)
    {
        if (count($request->json()->all())) {
            foreach ($request->json()->all() as $item)
                $this->createPost($item);

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
