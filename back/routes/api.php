<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeatController;
use App\Http\Controllers\FileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group([

    'prefix' => 'beat'

], function ($router) {

    Route::post("/", [BeatController::class, 'store']);
    Route::get("/", [BeatController::class, 'getActives']);
    Route::patch("/{id}", [BeatController::class, 'update']);
    Route::get("/all", [BeatController::class, 'getAll']);
    Route::get("/{id}", [BeatController::class, 'getOne']);
    Route::get("/random/{id}", [BeatController::class, 'getRandom']);
    Route::delete("/{id}", [BeatController::class, 'destroy']);
    Route::get("/{id}/tagged", [FileController::class, 'getTagged']);

    Route::post("/file/create", [FileController::class, 'createFolder']);
    Route::post("/file/beat", [FileController::class, 'storeBeat']);

});