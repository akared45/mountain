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
                'commenters.img',
                'commenters.id as commenter_id',
                'groupcomments.id as comment_id'
            )
            ->where('groupcomments.group_id', $id)
            ->orderBy('groupcomments.rating', 'desc')
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
            ->groupBy('groups.id', 'groups.name', 'groups.description', 'groups.image', 'leaders.username', 'groupcomments.created_at')
            ->get();

        return response()->json(['groups' => $groups]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string|max:255',
            'rating' => 'required',
        ]);

        $comment = DB::table('groupcomments')->where('id', $id)->first();

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        DB::table('groupcomments')
            ->where('id', $id)
            ->update([
                'content' => $request->input('content'),
                'rating' => $request->input('rating'),
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
                DB::raw('COALESCE(AVG(groupcomments.rating), 0) as average_rating')
            )
            ->groupBy('groups.id', 'groups.name', 'groups.description', 'groups.image', 'leaders.username')
            ->get();

        return response()->json([
            'message' => 'Comment updated successfully',
            'groups' => $groups
        ]);
    }

    public function delete($id)
    {
        $deleted = DB::table('groupcomments')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

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
    public function showcomment()
    {
        $comments = DB::table('groupcomments')
            ->leftJoin('groups', 'groupcomments.group_id', '=', 'groups.id')
            ->leftJoin('users as leaders', 'leaders.id', '=', 'groups.leader_id')
            ->select(
                'groupcomments.id as comment_id',
                'groupcomments.content',
                'groupcomments.rating',
                'groupcomments.created_at',
                'groupcomments.updated_at',
                'groups.name as group_name',
                'leaders.username'
            )
            ->get();

        return response()->json(['comment' => $comments]);
    }
    public function deletecomment($id)
    {
        $deleted = DB::table('groupcomments')
            ->where('id', $id)
            ->delete();
        if ($deleted) {
            return response()->json(['message' => 'Bình luận đã được xóa thành công.'], 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy bình luận.'], 404);
        }
    }
}
