<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeywordController extends Controller
{
    // 🟢 READ (list semua keyword)
    public function index()
    {
        return Inertia::render('Admin/KeywordManager', [
            'keywords' => Keyword::all()
        ]);
    }

    // 🟢 CREATE (simpan keyword baru)
    public function store(Request $request)
    {
        $request->validate([
            'keyword' => 'required|string|max:255',
            'response' => 'required|string',
        ]);

        Keyword::create($request->only(['keyword', 'response']));

        return redirect()->back()->with('success', 'Keyword berhasil ditambahkan.');
    }

    // 🟠 EDIT (ambil data 1 keyword)
    public function edit($id)
    {
        $keyword = Keyword::findOrFail($id);

        return Inertia::render('Admin/KeywordEdit', [
            'keyword' => $keyword
        ]);
    }

    // 🟠 UPDATE (update keyword yang diedit)
    public function update(Request $request, $id)
    {
        $request->validate([
            'keyword' => 'required|string|max:255',
            'response' => 'required|string',
        ]);

        $keyword = Keyword::findOrFail($id);
        $keyword->update($request->only(['keyword', 'response']));

        return redirect()->route('admin.keywords.index')->with('success', 'Keyword berhasil diupdate.');
    }

    // 🔴 DELETE (hapus keyword)
    public function destroy($id)
    {
        $keyword = Keyword::findOrFail($id);
        $keyword->delete();

        return redirect()->back()->with('success', 'Keyword berhasil dihapus.');
    }
}
