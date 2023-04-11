<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\InstrumentController;
use App\Http\Controllers\API\MajorSectorController;
use App\Http\Controllers\API\MinorSectorController;
use App\Http\Controllers\API\ProductTypeController;
use App\Http\Controllers\API\RegionController;
use App\Http\Controllers\API\RiskRatingController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\CountryController;
use App\Http\Controllers\API\CurrencyController;
use Illuminate\Support\Facades\Route;

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

Route::post('login', [AuthController::class, 'signin']);
Route::post('register', [AuthController::class, 'signup']);
Route::put('user-recommends/{id}', [UserController::class, 'userRecommendsUpdate']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('blogs', BlogController::class);
    Route::resource('product-types', ProductTypeController::class);
    Route::resource('country', CountryController::class);
    Route::resource('currency', CurrencyController::class);
    Route::resource('risk-rating', RiskRatingController::class);
    Route::resource('instrument', InstrumentController::class);
    Route::resource('major-sector', MajorSectorController::class);
    Route::resource('minor-sector', MinorSectorController::class);
    Route::resource('region', RegionController::class);
    Route::post('me', [UserController::class, 'show']);
    Route::get('users-list', [UserController::class, 'index']);
    Route::put('update-user/{id}', [UserController::class, 'update']);
    Route::put('update-user-role/{id}', [UserController::class, 'updateUserRole']);
});
