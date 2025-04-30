import React, { useState } from "react";
import { useForm } from "@inertiajs/inertia-react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

export default function KeywordManager({ keywords }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        processing,
        errors,
    } = useForm({
        id: null,
        keyword: "",
        response: "",
    });

    const openCreateModal = () => {
        reset();
        setEditData(null);
        setIsModalOpen(true);
    };

    const openEditModal = (keyword) => {
        setData({
            id: keyword.id,
            keyword: keyword.keyword,
            response: keyword.response,
        });
        setEditData(keyword);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            Inertia.put(
                `/admin/keywords/${editData.id}`,
                {
                    keyword: data.keyword,
                    response: data.response,
                },
                {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Keyword berhasil diperbarui!",
                            "success"
                        );
                        closeModal();
                    },
                }
            );
        } else {
            Inertia.post(
                "/admin/keywords",
                {
                    keyword: data.keyword,
                    response: data.response,
                },
                {
                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            "Keyword berhasil ditambahkan!",
                            "success"
                        );
                        closeModal();
                    },
                }
            );
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Apakah kamu yakin?",
            text: "Data ini akan dihapus secara permanen!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(`/admin/keywords/${id}`, {
                    onSuccess: () =>
                        Swal.fire(
                            "Terhapus!",
                            "Keyword berhasil dihapus.",
                            "success"
                        ),
                });
            }
        });
    };

    const paginate = (keywords, currentPage, itemsPerPage) => {
        const offset = (currentPage - 1) * itemsPerPage;
        return keywords.slice(offset, offset + itemsPerPage);
    };

    const totalPages = Math.ceil(keywords.length / itemsPerPage);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-700">
                        Manajemen Keyword
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={openCreateModal}
                            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-800 transition-all"
                        >
                            Tambah Keyword
                        </button>
                        <button
                            onClick={() => {
                                Swal.fire({
                                    title: "Yakin mau logout?",
                                    text: "Kamu akan keluar dari halaman admin.",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonText: "Ya, Logout",
                                    cancelButtonText: "Batal",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        Swal.fire({
                                            title: "Logging out...",
                                            didOpen: () => {
                                                Swal.showLoading();
                                                Inertia.post("/logout");
                                            },
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            allowEnterKey: false,
                                            showConfirmButton: false,
                                        });
                                    }
                                });
                            }}
                            className="bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {keywords.length === 0 ? (
                    <p className="text-gray-500 text-lg">
                        Belum ada keyword ditambahkan.
                    </p>
                ) : (
                    <div className="space-y-4">
                        {paginate(keywords, currentPage, itemsPerPage).map(
                            (k) => (
                                <div
                                    key={k.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex justify-between items-center shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800 text-xl">
                                            {k.keyword}
                                        </p>
                                        <p className="text-gray-600 text-base">
                                            {k.response}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => openEditModal(k)}
                                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(k.id)}
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

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg animate__animated animate__fadeIn">
                        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
                            {editData ? "Edit Keyword" : "Tambah Keyword"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Keyword"
                                    value={data.keyword}
                                    onChange={(e) =>
                                        setData("keyword", e.target.value)
                                    }
                                    className={`w-full px-5 py-3 border ${
                                        errors.keyword
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                />
                                {errors.keyword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.keyword}
                                    </p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Response"
                                    value={data.response}
                                    onChange={(e) =>
                                        setData("response", e.target.value)
                                    }
                                    className={`w-full px-5 py-3 border ${
                                        errors.response
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                                />
                                {errors.response && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.response}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg shadow-md hover:from-indigo-700 hover:to-indigo-800 disabled:opacity-50 transition-all"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : editData
                                        ? "Perbarui"
                                        : "Tambah"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
