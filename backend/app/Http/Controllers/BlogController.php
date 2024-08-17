<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function showCategory()
    {

        $enumValues = DB::select("SHOW COLUMNS FROM posts WHERE Field = 'category'");

        $enumList = [];
        if (isset($enumValues[0])) {
            $enumString = $enumValues[0]->Type;
            preg_match_all("/'([^']+)'/", $enumString, $matches);
            $enumList = $matches[1];
        }

        return response()->json(['category' => $enumList]);
    }


    public function showPosts()
    {
        $blog = DB::table('posts')
            ->select('posts.id as posts_id', 'posts.title', 'posts.content', 'posts.category', 'users.username', 'posts.created_at', 'users.img')
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->get();
        return response()->json(['blog' => $blog]);
    }

    public function addPosts(Request $request)
    {
        $data = [
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'category' => $request->input('category'),
            'author_id' => $request->input('author_id'),
            'created_at' => now(),
            'updated_at' => now(),
        ];

        $id = DB::table('posts')->insertGetId($data);

        $newPosts = DB::table('posts')->where('id', $id)->first();

        return response()->json(['NewPost' => $newPosts]);
    }
    public function update(Request $request, $id)
    {
        $title = $request->input('title');
        $content = $request->input('content');
        $category = $request->input('category');

        $updateResult = DB::table('posts')
            ->where('id', $id)
            ->update([
                'title' => $title,
                'content' => $content,
                'category' => $category,
                'updated_at' => now(),
            ]);
        if ($updateResult) {
            $updatedPost = DB::table('posts')
                ->select('posts.id as posts_id', 'posts.title', 'posts.content', 'posts.category', 'users.username', 'posts.created_at', 'users.img')
                ->join('users', 'posts.author_id', '=', 'users.id')
                ->where('posts.id', $id)
                ->first();

            return response()->json(['UpdatePost' => $updatedPost]);
        } else {
            return response()->json(['error' => 'Update failed.'], 500);
        }
    }
    public function delete($id)
    {
        $deleteResult = DB::table('posts')->where('id', $id)->delete();

        if ($deleteResult) {
            $Post = DB::table('posts')
                ->select('posts.id as posts_id', 'posts.title', 'posts.content', 'posts.category', 'users.username', 'posts.created_at', 'users.img')
                ->join('users', 'posts.author_id', '=', 'users.id')
                ->get();
            return response()->json(['Post' => $Post]);
        } else {
            return response()->json(['error' => 'Delete failed.'], 500);
        }
    }
}
