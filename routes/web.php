<?php

use App\Http\Controllers\LinkController;
use App\Http\Controllers\LinkOrderController;
use App\Http\Controllers\LinkStatusController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get("/profile/{user:username}", [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::resource('links', LinkController::class);
    Route::put('links/{link}/update-status', LinkStatusController::class)->name('links.update-status');
    Route::put('links/{link}/update-order', LinkOrderController::class)->name('links.update-order');
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
