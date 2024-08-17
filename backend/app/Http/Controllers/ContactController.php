<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class ContactController extends Controller
{
    //
    public function show()
    {
        $contacts = DB::table('contacts')->get();
        return response()->json($contacts);
    }

    public function send(Request $req)
    {

        $data = [
            'user_id' => $req->input('user_id'),
            'contact_phone' => $req->input('contact_phone'),
            'message' => $req->input('message'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
        $id = DB::table('contacts')->insertGetId($data);

        $message = DB::table('contacts')->where('id', $id)->first();

        return response()->json(['comment' => $message]);
    }
}
