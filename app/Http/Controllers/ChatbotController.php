<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function ask(Request $request)
    {
        $text = strtolower($request->input('message'));
        $keyword = Keyword::whereRaw('LOWER(keyword) = ?', [$text])->first();

        return response()->json([
            'response' => $keyword->response ?? 'Maaf, tidak ada jawaban untuk pertanyaan tersebut',
        ]);
    }
}
