<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SuccessStoryController extends Controller
{
    public function show()
    {
        $stories = DB::table('success_stories')
            ->join('mountain', 'success_stories.location_id', '=', 'mountain.id')
            ->select('success_stories.*', 'mountain.name as mountain_name')
            ->get();

        return response()->json($stories);
    }

    public function addStory(Request $request)
    {
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('images/stories', 'public');
        }
        $storyId = DB::table('success_stories')->insertGetId([
            'title' => $request->input('title'),
            'content' => $request->input('content'),
            'author_id' => $request->input('author_id'),
            'approved' => 0,
            'location_id' => $request->input('location_id', null),
            'image' => $imagePath,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $story = DB::table('success_stories')->where('id', $storyId)->first();
        return response()->json($story, 201);
    }
}
