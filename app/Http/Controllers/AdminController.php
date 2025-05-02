<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Keyword;
use App\Models\Feedback;

class AdminController extends Controller
{
    // Dashboard admin
    public function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    // Halaman Keyword
    public function keyword()
    {
        $keywords = Keyword::all();

        return Inertia::render('Keyword', [
            'keywords' => $keywords
        ]);
    }

    // Halaman Feedback
    public function feedback()
    {
        $feedbacks = Feedback::latest()->get();

        return Inertia::render('Feedback', [
            'feedbacks' => $feedbacks
        ]);
    }
}
