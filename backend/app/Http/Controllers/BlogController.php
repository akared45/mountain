<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            ->select('posts.id as posts_id', 'posts.title', 'posts.content', 'posts.category', 'users.username', 'posts.created_at')
            ->join('users', 'posts.author_id', '=', 'users.id')
            ->get();
        return response()->json(['blog' => $blog]);
    }
}
