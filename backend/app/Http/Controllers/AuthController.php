<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserModel;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    public function login(Request $req)
    {
        $req->validate([
            'username' => 'required',
            'password_hash' => 'required',
        ]);

        $user = UserModel::where('username', $req->username)->first();

        if (!$user || $user->password_hash !== $req->password_hash) {
            return response()->json([
                'message' => 'The provided credentials are incorrect.',
            ], 401);
        }

        $user->tokens()->delete();

        $tokenResult = $user->createToken('auth_token', ['role:' . $user->role]);

        return response()->json([
            'access_token' => $tokenResult->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }

    public function getUserFromToken(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id'=>$user->id,
            'username' => $user->username,
            'email' => $user->email,
            'role' => $user->role,
            'full_name'=>$user->full_name,
            'gender'=>$user->gender,
            'img'=>$user->img,
            'address'=>$user->address,
            'dob'=>$user->dob,
        ]);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'full_name' => 'required',
            'password_hash' => 'required',
        ]);

        $user = UserModel::create([
            'username' => $validatedData['username'],
            'password_hash' => $validatedData['password_hash'],
            'full_name' => $validatedData['full_name'],
            'email' => $validatedData['email'],
            'role' => 'user',

        ]);

        $tokenResult = $user->createToken('auth_token', ['role:user']);
        $token = $tokenResult;

        return response()->json([
            'access_token' => $token->plainTextToken,
            'token_type' => 'Bearer',
        ]);
    }
    public function updateUser($id, Request $request)
    {
        $user = DB::table('users')->where('id', $id)->first();
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        $password_hash = $request->input('password_hash');
        $full_name = $request->input('full_name');
        $email = $request->input('email');
        $gender = $request->input('gender');
        $address = $request->input('address');
        $dob = $request->input('dob');


        DB::table('users')
            ->where('id', $id)
            ->update([
                'password_hash' => $password_hash,
                'full_name' => $full_name,
                'email' => $email,
                'gender' => $gender,
                'address'=>$address,
                'dob'=>$dob,
            ]);

        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $imageName = $image->getClientOriginalName();
            $image->storeAs('public/images', $imageName);

            DB::table('users')
                ->where('id', $id)
                ->update(['img' => $imageName]);
        }

        $UserInfo = DB::table('users')
            ->select('id', 'password_hash', 'full_name', 'email', 'gender', 'img' ,'address','dob')
            ->get();

        return response()->json(['UserInfo' => $UserInfo]);
    }
}
