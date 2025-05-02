import React from "react";
import Swal from "sweetalert2";

export default function Dashboard() {
    const handleLogout = () => {
        Swal.fire({
            title: "Yakin ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                // Kosongkan localStorage/token jika ada
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect to login page
            }
        });
    };

    const goToKeyword = () => {
        window.location.href = "/admin/keywords"; // Navigate to keywords page
    };

    const goToFeedback = () => {
        window.location.href = "/admin/feedback"; // Navigate to feedback page
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.png')" }}
        >
            <div className="bg-white/80 p-10 rounded-xl shadow-lg text-center space-y-4">
                <h1 className="text-2xl font-bold text-green-800 mb-4">
                    Admin Dashboard
                </h1>
                <button
                    onClick={goToKeyword}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md w-48"
                >
                    Keyword
                </button>
                <br />
                <button
                    onClick={goToFeedback}
                    className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full shadow-md w-48"
                >
                    Feedback
                </button>
                <br />
                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full shadow-md w-48"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
