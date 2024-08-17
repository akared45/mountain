<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    //
    public function show()
    {
        $user = DB::table('users')
            ->select('id', 'username', 'full_name', 'email', 'role', 'gender', 'img', 'address', 'dob')
            ->get();

        return response()->json(['ListUser' => $user]);
    }

    public function updateRole(Request $request, $id)
    {
        $role = $request->input('role');

        $updated = DB::table('users')
            ->where('id', $id)
            ->update(['role' => $role]);

        if ($updated) {
            return response()->json(['message' => 'Role updated successfully']);
        } else {
            return response()->json(['message' => 'User not found or role not changed'], 404);
        }
    }
    public function showrole()
    {

        $enumValues = DB::select("SHOW COLUMNS FROM users WHERE Field = 'role'");

        $enumList = [];
        if (isset($enumValues[0])) {
            $enumString = $enumValues[0]->Type;
            preg_match_all("/'([^']+)'/", $enumString, $matches);
            $enumList = $matches[1];
        }

        return response()->json(['role' => $enumList]);
    }
}
