<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CountController extends Controller
{
    //
    public function count()
    {
        $totalMountains = DB::table('mountain')->count();

        $totalUsers = DB::table('users')->count();

        return response()->json([
            'total_mountains' => $totalMountains,
            'total_users' => $totalUsers
        ]);
    }
}
