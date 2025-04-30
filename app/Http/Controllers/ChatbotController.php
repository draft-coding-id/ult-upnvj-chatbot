<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\Request;

class ChatbotController extends Controller
{
    public function ask(Request $request)
    {
        $text = strtolower($request->input('message'));

        // Ambil semua keyword dari database
        $keywords = Keyword::all();

        $matches = [];

        // Cari keyword yang ada di dalam pesan
        foreach ($keywords as $keyword) {
            if (strpos($text, strtolower($keyword->keyword)) !== false) {
                $matches[] = $keyword;
            }
        }

        // Jika ada yang cocok
        if (!empty($matches)) {
            // Urutkan berdasarkan panjang keyword (dari paling panjang ke pendek)
            usort($matches, function($a, $b) {
                return strlen($b->keyword) - strlen($a->keyword);
            });

            // Pilih keyword paling panjang sebagai prioritas
            $bestMatch = $matches[0];

            return response()->json([
                'response' => $bestMatch->response,
            ]);
        }

        // Jika tidak ada keyword yang cocok
        return response()->json([
            'response' => 'Maaf, tidak ada jawaban untuk pertanyaan tersebut',
        ]);
    }
}
