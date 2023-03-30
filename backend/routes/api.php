<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\ProductTypesController;
use App\Http\Controllers\CurrencyController;

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

Route::get('product-types', [ProductTypesController::class, 'index']);

Route::post('product-types', [ProductTypesController::class, 'store']);

Route::delete('product-types/{id}', [ProductTypesController::class, 'destroy']);

Route::put('product-types/{id}', [ProductTypesController::class, 'update']);

Route::get('currency', [CurrencyController::class, 'index']);

Route::post('currency', [CurrencyController::class, 'store']);

Route::delete('currency/{id}', [CurrencyController::class, 'destroy']);

Route::put('currency/{id}', [CurrencyController::class, 'update']);


