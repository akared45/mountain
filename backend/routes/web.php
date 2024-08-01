<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MountainController;
use App\Http\Controllers\AuthController;
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
Route::post('/register', [AuthController::class, 'register']);

