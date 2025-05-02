<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Admin\KeywordController;
use App\Http\Controllers\Admin\FeedbackController;
use App\Http\Controllers\ChatbotController;

Route::get('/', function () {
    return Inertia::render('Chatbot');
});

// Halaman login
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::post('/login', function (Request $request) {
    $username = $request->input('username');
    $password = $request->input('password');

    if ($username === 'admin' && $password === 'password123') {
        $request->session()->put('is_admin', true);
        return redirect('/admin/keywords');
    }

    return back()->withErrors([
        'username' => 'Username atau Password salah',
    ]);
});

Route::post('/logout', function (Request $request) {
    $request->session()->forget('is_admin');
    return redirect('/login');
});

// Manual cek di setiap route
Route::get('/admin/keywords', function (Request $request) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(KeywordController::class)->index($request);
})->name('admin.keywords.index');

Route::post('/admin/keywords', function (Request $request) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(KeywordController::class)->store($request);
});

Route::put('/admin/keywords/{id}', function (Request $request, $id) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(KeywordController::class)->update($request, $id);
});

Route::delete('/admin/keywords/{id}', function (Request $request, $id) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(KeywordController::class)->destroy($request, $id);
});

// Feedback routes juga sama
Route::get('/admin/feedback', function (Request $request) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(FeedbackController::class)->index($request);
})->name('admin.feedback.index');

Route::post('/admin/feedback', function (Request $request) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(FeedbackController::class)->store($request);
});

Route::get('/admin/feedback/{id}', function (Request $request, $id) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(FeedbackController::class)->show($request, $id);
});

Route::put('/admin/feedback/{id}', function (Request $request, $id) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(FeedbackController::class)->update($request, $id);
});

Route::delete('/admin/feedback/{id}', function (Request $request, $id) {
    if (!$request->session()->get('is_admin')) {
        return redirect('/login');
    }
    return app(FeedbackController::class)->destroy($request, $id);
});

Route::post('/feedbacks', [FeedbackController::class, 'store']);
Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']);
Route::post('/ask', [ChatbotController::class, 'ask']);