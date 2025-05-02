import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";  // Pastikan axios diimpor

export default function Feedback() {
    const { feedbacks } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 5;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah kamu yakin?",
            text: "Data feedback ini akan dihapus permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                axios
                .delete(`/admin/feedback/${id}`) // Ubah ini ke /admin/feedback/${id}
                .then(() => {
                    Swal.fire(
                        "Dihapus!",
                        "Feedback berhasil dihapus.",
                        "success"
                    ).then(() => {
                        // Memperbarui tampilan setelah penghapusan
                        Inertia.reload(); // Reload halaman agar data terbaru muncul
                    });
                })
                .catch((error) => {
                    console.error(error); // Log error untuk debug
                    Swal.fire(
                        "Gagal",
                        "Terjadi kesalahan saat menghapus.",
                        "error"
                    );
                });
            
            }
        });
    };

    const paginate = (feedbacks, currentPage, itemsPerPage) => {
        const offset = (currentPage - 1) * itemsPerPage;
        return feedbacks.slice(offset, offset + itemsPerPage);
    };

    const totalPages = Math.ceil(feedbacks.length / itemsPerPage);

    const filteredFeedbacks = feedbacks.filter((feedback) =>
        feedback.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.isi_feedback.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-700">
                        Daftar Feedback
                    </h1>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Cari feedback..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        />
                        <button
                            onClick={() => {
                                Inertia.get("/admin/dashboard");
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all"
                        >
                            Kembali
                        </button>
                    </div>
                </div>

                {filteredFeedbacks.length === 0 ? (
                    <p className="text-gray-500 text-lg text-center">
                        Belum ada feedback yang masuk.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {paginate(filteredFeedbacks, currentPage, itemsPerPage).map(
                            (feedback) => (
                                <div
                                    key={feedback.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex justify-between items-center shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div>
                                        <h3 className="font-semibold text-indigo-600 text-xl">
                                            {feedback.nama}
                                        </h3>
                                        <p className="text-gray-700 text-base mt-1">
                                            {feedback.isi_feedback}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() =>
                                                handleDelete(feedback.id)
                                            }
                                            className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}

                {/* Pagination Controls */}
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-lg text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
