<?php

use App\Http\Controllers\API\AboutUsController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\BlogController;
use App\Http\Controllers\API\IdeaController;
use App\Http\Controllers\API\InstrumentController;
use App\Http\Controllers\API\MajorSectorController;
use App\Http\Controllers\API\MinorSectorController;
use App\Http\Controllers\API\PostController;
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
Route::get('product-types', [ProductTypeController::class, 'index']);
Route::get('country', [CountryController::class, 'index']);
Route::get('currency', [CurrencyController::class, 'index']);
Route::get('about-us', [AboutUsController::class, 'index']);
Route::get('post', [PostController::class, 'index']);
Route::get('idea', [IdeaController::class, 'index']);
Route::post('idea/{id}', [IdeaController::class, 'show']);
Route::post('user-holdings/{id}', [UserController::class, 'holdingsList']);
Route::post('user-list-by-role', [UserController::class, 'usersListByRole']);
Route::put('user-recommends/{id}', [UserController::class, 'userRecommendsUpdate']);

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('blogs', BlogController::class);

    Route::post('product-types', [ProductTypeController::class, 'store']);
    Route::put('product-types/{id}', [ProductTypeController::class, 'update']);
    Route::delete('product-types/{id}', [ProductTypeController::class, 'destroy']);

    Route::post('country', [CountryController::class, 'store']);
    Route::put('country/{id}', [CountryController::class, 'update']);
    Route::delete('country/{id}', [CountryController::class, 'destroy']);

    Route::post('currency', [CurrencyController::class, 'store']);
    Route::put('currency/{id}', [CurrencyController::class, 'update']);
    Route::delete('currency/{id}', [CurrencyController::class, 'destroy']);

    Route::post('about-us', [AboutUsController::class, 'store']);
    Route::put('about-us/{id}', [AboutUsController::class, 'update']);
    Route::delete('about-us/{id}', [AboutUsController::class, 'destroy']);

    Route::post('post', [PostController::class, 'store']);
    Route::put('post/{id}', [PostController::class, 'update']);
    Route::post('post/{id}', [PostController::class, 'show']);
    Route::delete('post/{id}', [PostController::class, 'destroy']);

    Route::resource('risk-rating', RiskRatingController::class);
    Route::resource('instrument', InstrumentController::class);
    Route::resource('major-sector', MajorSectorController::class);
    Route::resource('minor-sector', MinorSectorController::class);
    Route::resource('region', RegionController::class);

    Route::post('idea', [IdeaController::class, 'store']);
    Route::put('idea/{id}', [IdeaController::class, 'update']);
    Route::delete('idea/{id}', [IdeaController::class, 'destroy']);

    Route::post('idea-details-with-clients/{id}', [IdeaController::class, 'showIdeaDetailsWithClients']);
    Route::post('idea-holder/{id}', [IdeaController::class, 'updateHolder']);
    Route::post('idea-potential-clients/{id}', [IdeaController::class, 'updatePotentialClients']);

    Route::post('me', [UserController::class, 'show']);
    Route::get('users-list', [UserController::class, 'index']);
    Route::put('update-user/{id}', [UserController::class, 'update']);
    Route::put('update-user-role/{id}', [UserController::class, 'updateUserRole']);
    Route::post('user-possible-clients', [UserController::class, 'possibleClientsList']);
    Route::post('ideas-recommended-by-rm/{id}', [UserController::class, 'showRecommendedIdeas']);
});
