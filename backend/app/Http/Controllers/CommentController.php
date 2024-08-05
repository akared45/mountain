<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    //
    public function showGroups()
    {
        $groups = DB::table('groups')
            ->leftJoin('groupcomments', 'groupcomments.group_id', '=', 'groups.id')
            ->leftJoin('users as leaders', 'leaders.id', '=', 'groups.leader_id')
            ->select(
                'groups.id',
                'groups.name',
                'groups.description',
                'groups.image',
                'leaders.username as leader_name',
                DB::raw('COALESCE(AVG(groupcomments.rating), 0) as average_rating')
            )
            ->groupBy('groups.id', 'groups.name', 'groups.description', 'groups.image', 'leaders.username')
            ->get();

        return response()->json(['groups' => $groups]);
    }

    public function showGroupComments($id)
    {
        $comments = DB::table('groupcomments')
            ->join('users as commenters', 'commenters.id', '=', 'groupcomments.user_id')
            ->select(
                'groupcomments.content',
                'groupcomments.rating',
                'groupcomments.created_at',
                'commenters.username as commenter_name',
                'commenters.img'
            )
            ->where('groupcomments.group_id', $id)
            ->get();

        return response()->json(['comments' => $comments]);
    }
    public function postComment($userid, $groupid, Request $request)
    {

        $group = DB::table('groups')->where('id', $groupid)->first();
        $user = DB::table('users')->where('id', $userid)->first();

        if (!$group) {
            return response()->json(['error' => 'Group not found'], 404);
        }
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        DB::table('groupcomments')->insert([
            'group_id' => $groupid,
            'user_id' => $userid,
            'content' => $request->input('content'),
            'rating' => $request->input('rating'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $groups = DB::table('groups')
            ->leftJoin('groupcomments', 'groupcomments.group_id', '=', 'groups.id')
            ->leftJoin('users as leaders', 'leaders.id', '=', 'groups.leader_id')
            ->select(
                'groups.id',
                'groups.name',
                'groups.description',
                'groups.image',
                'leaders.username as leader_name',
                'groupcomments.created_at',
                DB::raw('COALESCE(AVG(groupcomments.rating), 0) as average_rating')
            )
            ->groupBy('groups.id', 'groups.name', 'groups.description', 'groups.image', 'leaders.username','groupcomments.created_at')
            ->get();

        return response()->json(['groups' => $groups]);
    }
}
