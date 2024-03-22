<?php

use App\Http\Controllers\BeatActionController;
use App\Http\Controllers\BeatController;
use App\Http\Controllers\BeatLicenseController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MensajeContactoController;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WebhookController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//AUTENTICACIÓN

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('check-user-google', [AuthController::class, 'checkUserGoogle']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login-oauth', [AuthController::class, 'loginOauth']);


});

//ACCIONES

Route::group([

    'middleware' => 'api',
    'prefix' => 'action'

], function ($router) {

    Route::post('/click', [BeatActionController::class, 'storeClick']);
    Route::post('/play', [BeatActionController::class, 'storePlay']);
    Route::post('/save', [BeatActionController::class, 'storeSave']);
});

//BEATS

Route::group([

    'middleware' => 'api',
    'prefix' => 'beat'

], function ($router) {

    Route::post("/", [BeatController::class, 'store']);
    Route::get("/", [BeatController::class, 'getActives']);
    Route::patch("/{id}", [BeatController::class, 'update']);
    Route::get("/all", [BeatController::class, 'getAll']);
    Route::get("/{id}", [BeatController::class, 'getOne']);
    Route::delete("/{id}", [BeatController::class, 'destroy']);

    Route::post("/file/create", [FileController::class, 'createFolder']);
    Route::post("/file/beat", [FileController::class, 'storeBeat']);

});

Route::group([
    'prefix' => 'beatlicense'
], function ($router) {
    Route::get('/getOne', [BeatLicenseController::class, 'getOne']);
});

//CONTACTO

Route::group([

    'middleware' => 'api',
    'prefix' => 'contacto'

], function ($router) {
    Route::post('/', [MensajeContactoController::class, 'store']);
    Route::get('/', [MensajeContactoController::class, 'index']);
});

//CARRITO

Route::group([

    'middleware' => 'api',
    'prefix' => 'cart'
], function ($router) {

    Route::post("/", [CartController::class, 'store']);
    Route::post("/addItem", [CartController::class, 'addItem']);
    Route::post("/removeItem", [CartController::class, 'removeItem']);
    Route::post("/clearCart", [CartController::class, 'clearCart']);
    Route::get("/", [CartController::class, 'index']);
    Route::get("/{id}", [CartController::class, 'getOne']);
    Route::delete("/{id}", [CartController::class, 'destroy']);
    Route::post("/payLogged", [CartController::class, 'payLogged']);
});

Route::group([

    'middleware' => 'api',
    'prefix' => 'user'

], function ($router) {
    Route::get("/purchases", [UserController::class, 'getPurchases']);
    Route::patch("/{id}", [UserController::class, 'update']);
    Route::get("/", [UserController::class, 'index']);
    Route::get("/{id}", [UserController::class, 'getOne']);
});


Route::group([

    'middleware' => 'api',
    'prefix' => 'genres'
], function ($router) {
    Route::get("/", [GenreController::class, 'index']);
    Route::post("/", [GenreController::class, 'store']);
    Route::patch("/{id}", [GenreController::class, 'update']);
    Route::delete("/{id}", [GenreController::class, 'destroy']);
});


Route::group([

    'middleware' => 'api',
    'prefix' => 'moods'
], function ($router) {
    Route::get("/", [MoodController::class, 'index']);
    Route::post("/", [MoodController::class, 'store']);
    Route::patch("/{id}", [MoodController::class, 'update']);
    Route::delete("/{id}", [MoodController::class, 'destroy']);
});


Route::get("/roles", [RoleController::class, 'index']);
Route::post("/stripe/getSessionInfo", [StripeController::class, 'getSessionInfo']);

Route::group([

    'middleware' => 'api',
    'prefix' => 'project'

], function ($router) {
    Route::get("/", [ProjectController::class, 'index']);
    Route::get("/getVisible", [ProjectController::class, 'getVisible']);
    Route::get("/{id}", [ProjectController::class, 'getOne']);
    Route::post("/", [ProjectController::class, 'store']);
    Route::patch("/{id}", [ProjectController::class, 'update']);
    Route::delete("/{id}", [ProjectController::class, 'destroy']);
});


Route::post("/testWaterMark/{id}", [BeatController::class, 'testWaterMark']);
