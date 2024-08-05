<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::prefix("admin")->group(function(){
    Route::get('/mountain',[MountainController::class,'show']);
    Route::post('/mountain/addnew',[MountainController::class,'insert']);
    Route::delete('/mountain/delete/{id}',[MountainController::class,'delete']);
    Route::post('/mountain/update/{id}',[MountainController::class,'update']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'getUserFromToken'])->middleware('auth:sanctum');
Route::post('/user/update/{id}', [AuthController::class, 'updateUser']);
Route::post('/user/changepass/{id}', [AuthController::class, 'changePass']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/users', [UserController::class, 'show']);
Route::post('/user/role/{id}', [UserController::class, 'updateRole']);

Route::get('/groups', [CommentController::class, 'showGroups']);
Route::get('/groups/comments/{id}', [CommentController::class, 'showGroupComments']);
Route::post('/groups/{groupid}/user/{userid}/comment', [CommentController::class, 'postComment']);

Route::get('/count', [CountController::class, 'count']);

