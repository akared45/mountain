<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommentController extends Controller
{
    //
    public function show()
    {
        $Group = DB::table('groups')
            ->leftJoin('groupcomments', 'groupcomments.group_id', '=', 'groups.id')
            ->join('users as leaders', 'leaders.id', '=', 'groups.leader_id')
            ->leftJoin('users as commenters', 'commenters.id', '=', 'groupcomments.user_id')
            ->select(
                'groups.id',
                'groups.name',
                'groups.description',
                'groups.image',
                'groupcomments.content',
                'groupcomments.rating',
                'groupcomments.created_at',
                'leaders.username as leader_name',
                'commenters.username as commenter_name'
            )
            ->get();

        return response()->json(['Group' => $Group]);
    }
}
