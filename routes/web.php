<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\KeywordController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\Admin\FeedbackController;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Chatbot');
});

Route::get('/admin/keywords', [KeywordController::class, 'index'])->name('admin.keywords.index');
Route::post('/admin/keywords', [KeywordController::class, 'store']);
Route::put('/admin/keywords/{id}', [KeywordController::class, 'update']);
Route::delete('/admin/keywords/{id}', [KeywordController::class, 'destroy']);

Route::get('/admin/feedback', [FeedbackController::class, 'index'])->name('admin.feedback.index');
Route::post('/admin/feedback', [FeedbackController::class, 'store']);
Route::get('/admin/feedback/{id}', [FeedbackController::class, 'show']);
Route::put('/admin/feedback/{id}', [FeedbackController::class, 'update']);
Route::delete('/admin/feedback/{id}', [FeedbackController::class, 'destroy']);


Route::post('/ask', [ChatbotController::class, 'ask']);
