<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    /**
     * Menampilkan semua feedback.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Admin/Feedback', [
            'feedbacks' => Feedback::all()
        ]);
    }

    /**
     * Menyimpan feedback baru.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validasi input dari pengguna
        $request->validate([
            'nama' => 'required|string|max:255',
            'isi_feedback' => 'required|string',
        ]);

        // Membuat feedback baru
        $feedback = Feedback::create([
            'nama' => $request->nama,
            'isi_feedback' => $request->isi_feedback,
        ]);

        return response()->json([
            'message' => 'Feedback berhasil disimpan!',
            'data' => $feedback
        ], 201); // Response dengan status 201 (Created)
    }

    /**
     * Menampilkan feedback berdasarkan ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $feedback = Feedback::find($id);

        if ($feedback) {
            return response()->json($feedback);
        } else {
            return response()->json(['message' => 'Feedback tidak ditemukan!'], 404);
        }
    }

    /**
     * Mengupdate feedback berdasarkan ID.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validasi input
        $request->validate([
            'nama' => 'required|string|max:255',
            'isi_feedback' => 'required|string',
        ]);

        $feedback = Feedback::find($id);

        if ($feedback) {
            $feedback->update([
                'nama' => $request->nama,
                'isi_feedback' => $request->isi_feedback,
            ]);

            return response()->json([
                'message' => 'Feedback berhasil diperbarui!',
                'data' => $feedback
            ]);
        } else {
            return response()->json(['message' => 'Feedback tidak ditemukan!'], 404);
        }
    }

    /**
     * Menghapus feedback berdasarkan ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $feedback = Feedback::find($id);

        if ($feedback) {
            $feedback->delete();
            return response()->json(['message' => 'Feedback berhasil dihapus!']);
        } else {
            return response()->json(['message' => 'Feedback tidak ditemukan!'], 404);
        }
    }
}
