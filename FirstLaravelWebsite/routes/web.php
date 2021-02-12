<?php

use App\Http\Controllers\PageController;
use App\Http\Controllers\TodoListController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', [PageController::class, 'home'])->name("home");


//Todo list routes
Route::get('/list-items', [TodoListController::class, 'listItems'])->name('list-items');
Route::post('/add-item', [TodoListController::class, 'addItem'])->name('add-item');
Route::post('/remove-item/{index}', [TodoListController::class, 'removeItem'])->name('remove-item');
Route::post('/update-item/{index}', [TodoListController::class, 'updateItem'])->name('update-item');




