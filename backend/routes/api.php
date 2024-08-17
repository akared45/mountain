<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\MountainController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SuccessStoryController;
use App\Http\Controllers\ContactController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
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
Route::get('/user/role',[UserController::class,'showRole']);

Route::get('/groups', [CommentController::class, 'showGroups']);
Route::get('/groups/comments/{id}', [CommentController::class, 'showGroupComments']);
Route::post('/groups/{groupid}/user/{userid}/comment', [CommentController::class, 'postComment']);
Route::post('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'delete']);
Route::get('/comments', [CommentController::class, 'showcomment']);
Route::delete('/comments/delete/{id}', [CommentController::class, 'deletecomment']);

Route::get('/blog/category',[BlogController::class,'showCategory']);
Route::get('/blog',[BlogController::class,'showPosts']);
Route::post('/blog/add',[BlogController::class,'addPosts']);
Route::post('/blog/update/{id}',[BlogController::class,'update']);
Route::delete('/blog/delete/{id}',[BlogController::class,'delete']);


Route::get('/count', [CountController::class, 'count']);
Route::get('/post-category-analytics', [CountController::class, 'getPostCategoryAnalytics']);
Route::get('/comment-counts', [CountController::class, 'getCommentCounts']);
Route::middleware('auth:sanctum')->get('/record-visit', [CountController::class, 'recordVisit']);
Route::get('/totalvisit', [CountController::class, 'showViewPage']);

Route::get('/story',[SuccessStoryController::class,'show']);
Route::post('/story/add',[SuccessStoryController::class,'addStory']);

Route::get('/contact',[ContactController::class,'show']);
Route::post('/contact/send',[ContactController::class,'send']);
