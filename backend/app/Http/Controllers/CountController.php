<?php

namespace App\Http\Controllers;

use App\Models\PageView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CountController extends Controller
{
    //
    public function count()
    {
        $totalMountains = DB::table('mountain')->count();

        $totalUsers = DB::table('users')->count();

        $totalPosts = DB::table('posts')->count();
        return response()->json([
            'total_mountains' => $totalMountains,
            'total_users' => $totalUsers,
            'total_posts' => $totalPosts
        ]);
    }
    public function getPostCategoryAnalytics()
    {
        $postCategories = DB::table('posts')
            ->select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->get();
        return response()->json([
            'total_posts' => $postCategories
        ]);
    }
    public function getCommentCounts()
    {
        $commentsCount = DB::table('groupcomments')
            ->select('groups.name', DB::raw('COUNT(*) as count'))
            ->join('groups', 'groupcomments.group_id', '=', 'groups.id')
            ->groupBy('groups.name')
            ->get();

        return response()->json($commentsCount);
    }

    public function recordVisit(Request $request)
    {
        $userId = auth()->check() ? auth()->id() : null;
        DB::table('visits')->insert([
            'page_url' => $request->url(),
            'user_id' => $userId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Page view recorded successfully',
            'page_url' => $request->url(),
            'user_id' => $userId,
        ]);
    }
    public function showViewPage()
    {
        $totalVisitorsPerDay = DB::table('visits')
            ->select(DB::raw('DATE(created_at) as visit_date'), DB::raw('COUNT(DISTINCT user_id) as total_visitors'))
            ->groupBy('visit_date')
            ->get();

        return response()->json($totalVisitorsPerDay);
    }
}
