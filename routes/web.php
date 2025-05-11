<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\KeywordController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\ChatbotController;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Halaman chatbot publik
Route::get('/', fn() => Inertia::render('Chatbot'));

// Halaman login admin
Route::get('/login', fn() => Inertia::render('Login'))->name('login');

// Login attempt untuk admin
Route::post('/login', function (Request $request) {
    $username = $request->input('username');
    $password = $request->input('password');

    if ($username === 'admin' && $password === 'password123') {
        $request->session()->put('is_admin', true);
        return redirect()->route('admin.dashboard');
    }

    return back()->withErrors(['username' => 'Username atau Password salah']);
})->name('login.attempt');

// Logout admin
Route::post('/logout', function (Request $request) {
    $request->session()->forget('is_admin');
    return redirect()->route('login');
})->name('logout');

// Route yang hanya bisa diakses oleh admin (direct middleware check without Kernel)
Route::group([], function () {
    Route::get('/admin/dashboard', function (Request $request) {
        // Cek apakah user admin
        if (!$request->session()->get('is_admin')) {
            return redirect()->route('login');
        }

        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Rute untuk keyword
    Route::get('/admin/keywords', function (Request $request) {
        if (!$request->session()->get('is_admin')) {
            return redirect()->route('login');
        }

        return app(KeywordController::class)->index($request);
    })->name('admin.keywords.index');

    Route::post('/admin/keywords', function (Request $request) {
        if (!$request->session()->get('is_admin')) {
            return redirect()->route('login');
        }

        return app(KeywordController::class)->store($request);
    });

    Route::put('/admin/keywords/{id}', function (Request $request, $id) {
        if (!$request->session()->get('is_admin')) {
            return redirect()->route('login');
        }

        return app(KeywordController::class)->update($request, $id);
    });


    // Rute untuk feedback
    Route::get('/admin/feedback', function (Request $request) {
        if (!$request->session()->get('is_admin')) {
            return redirect()->route('login');
        }

        return app(FeedbackController::class)->index($request);
    })->name('admin.feedback.index');
});

Route::delete('/admin/feedback/{id}', [FeedbackController::class, 'destroy']);
Route::delete('/admin/keywords/{id}', [KeywordController::class, 'destroy']);

// Public routes
Route::post('/ask', [ChatbotController::class, 'ask']);
Route::post('/feedbacks', [FeedbackController::class, 'store']);
