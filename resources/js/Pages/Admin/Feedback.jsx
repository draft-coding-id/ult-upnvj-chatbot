import React from 'react';
import { usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Feedback() {
    const { feedbacks } = usePage().props;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Data feedback ini akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/feedback/${id}`)
                    .then(() => {
                        Swal.fire('Dihapus!', 'Feedback berhasil dihapus.', 'success')
                            .then(() => {
                                window.location.reload();
                            });
                    })
                    .catch(() => {
                        Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus.', 'error');
                    });
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">Daftar Feedback</h1>

            <div className="w-full max-w-3xl bg-white shadow rounded-lg p-6">
                {feedbacks.length === 0 ? (
                    <p className="text-gray-500 text-center">Belum ada feedback yang masuk.</p>
                ) : (
                    <div className="space-y-4">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                <h3 className="font-semibold text-indigo-600">{feedback.nama}</h3>
                                <p className="text-gray-700 mt-1">{feedback.isi_feedback}</p>
                                <button
                                    onClick={() => handleDelete(feedback.id)}
                                    className="mt-3 text-red-600 hover:text-red-800 text-sm"
                                >
                                    Hapus
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
