import React, { useState } from "react";
import axios from "axios";
import { Copy, Trash, MessageSquare, Send } from "lucide-react"; // Import Lucide React icons
import Swal from "sweetalert2"; // Import SweetAlert2

export default function Chatbot() {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copyStatus, setCopyStatus] = useState(""); // State to track copy status
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [name, setName] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setChat([...chat, { user: userMessage }]);
        setMessage("");
        setIsLoading(true);

        try {
            const res = await axios.post("/ask", { message: userMessage });
            setChat((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].bot = res.data.response;
                return updated;
            });
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const handleCopy = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyStatus("Copied!"); // Change the button text to 'Copied!'
                setTimeout(() => {
                    setCopyStatus("Copy"); // Revert back to 'Copy' after 2 seconds
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy text:", err);
            });
    };

    const handleDeleteChat = () => {
        // SweetAlert confirmation for chat deletion
        Swal.fire({
            title: "Are you sure?",
            text: "This action will delete the chat history!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                setChat([]); // Clear chat history if confirmed
                Swal.fire(
                    "Deleted!",
                    "Your chat history has been deleted.",
                    "success"
                );
            }
        });
    };

    const handleFeedback = () => {
        setShowModal(true); // Show the feedback modal
    };

    const handleModalClose = () => {
        setShowModal(false); // Close the feedback modal
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const feedbackData = {
            nama: isAnonymous ? "Anonim" : name,
            isi_feedback: feedback,
        };

        // Simulate API call for feedback submission
        axios
            .post("/feedbacks", feedbackData)
            .then((response) => {
                // Show SweetAlert success message after successful feedback submission
                Swal.fire({
                    title: "Feedback Submitted!",
                    text: "Thank you for your feedback.",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    setShowModal(false); // Close the modal after submission
                    setName(""); // Clear name input
                    setFeedback(""); // Clear feedback input
                });
            })
            .catch((error) => {
                // Show SweetAlert error message if something goes wrong
                Swal.fire({
                    title: "Submission Failed",
                    text: "Something went wrong while submitting your feedback.",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
                console.error("Error submitting feedback:", error);
            });
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center px-4 py-6"
            style={{
                backgroundImage: "url('/images/bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full max-w-2xl flex flex-col h-[80vh] bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center p-6">
                    <img
                        src="/images/logo.png"
                        alt="Logo UPN"
                        className="mx-auto mb-4 w-96 h-16"
                    />
                    <p className="text-green-800 mt-2 font-bold border-b border-green-800 pb-2">
                        Layanan Informasi Untuk Mahasiswa, Masyarakat, dan
                        Tenaga Kependidikan
                    </p>

                    {/* Buttons Below Header */}
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            onClick={handleDeleteChat}
                            className="flex items-center text-green-700 bg-white hover:bg-green-100 px-4 py-1 rounded-full shadow transition duration-300 text-sm"
                        >
                            <Trash size={16} className="mr-1" />{" "}
                            {/* Trash Icon */}
                            Hapus Chat
                        </button>
                        <button
                            onClick={handleFeedback}
                            className="flex items-center text-green-700 bg-white hover:bg-green-100 px-4 py-1 rounded-full shadow transition duration-300 text-sm"
                        >
                            <MessageSquare size={16} className="mr-1" />{" "}
                            {/* Message Icon */}
                            Feedback
                        </button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {chat.length === 0 && (
                        <div className="flex justify-start">
                            <div className="bg-green-200 text-black p-3 rounded-2xl text-sm max-w-md">
                                Selamat datang di Unit Layanan Terpadu! Silakan
                                ajukan pertanyaan Anda.
                            </div>
                        </div>
                    )}

                    {chat.map((msg, index) => (
                        <div key={index} className="space-y-2">
                            {/* User Message */}
                            <div className="flex justify-end">
                                <div className="bg-gray-200 text-black p-3 rounded-2xl text-sm max-w-md">
                                    {msg.user}
                                </div>
                            </div>

                            {/* Bot Message */}
                            {msg.bot && (
                                <div className="flex justify-start">
                                    <div className="bg-green-200 text-black p-3 rounded-2xl text-sm max-w-md">
                                        {msg.bot}
                                    </div>
                                </div>
                            )}

                            {/* Copy Button */}
                            {msg.bot && (
                                <div className="flex justify-start">
                                    <button
                                        onClick={() => handleCopy(msg.bot)}
                                        className="flex items-center gap-2 text-green-700 hover:text-green-800 text-sm mt-2 transition duration-300 ease-in-out transform hover:scale-105"
                                    >
                                        <Copy size={16} /> {/* Lucide Icon */}
                                        {copyStatus || "Copy"}
                                    </button>
                                </div>
                            )}

                            {/* Loading Animation */}
                            {!msg.bot &&
                                isLoading &&
                                index === chat.length - 1 && (
                                    <div className="flex justify-start">
                                        <div className="p-3 rounded-2xl text-sm max-w-md bg-green-200 text-black flex gap-1">
                                            <span className="animate-bounce">
                                                .
                                            </span>
                                            <span className="animate-bounce delay-150">
                                                .
                                            </span>
                                            <span className="animate-bounce delay-300">
                                                .
                                            </span>
                                        </div>
                                    </div>
                                )}
                        </div>
                    ))}
                </div>

                {/* Input Section */}
                <div className="border-t p-4 bg-white flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ketik pesan Anda..."
                        className="flex-1 border px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full shadow transition disabled:opacity-50"
                    >
                        <Send size={20} /> {/* Send Icon */}
                    </button>
                </div>
            </div>

            {/* Feedback Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold text-green-800 mb-4">
                            Berikan Feedback Anda
                        </h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={isAnonymous ? "Anonim" : name} // Set "Anonim" jika checkbox dicentang
                                    onChange={(e) =>
                                        !isAnonymous && setName(e.target.value)
                                    } // Jangan ubah jika anonym
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    placeholder="Nama Anda"
                                    disabled={isAnonymous} // Nonaktifkan input jika anonim
                                />
                                <div className="flex items-center gap-2 mt-2">
                                    <input
                                        type="checkbox"
                                        id="anonymous"
                                        checked={isAnonymous}
                                        onChange={(e) =>
                                            setIsAnonymous(e.target.checked)
                                        } // Mengubah status anonim
                                    />
                                    <label
                                        htmlFor="anonymous"
                                        className="text-sm"
                                    >
                                        Kirim sebagai Anonim
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="feedback"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Feedback
                                </label>
                                <textarea
                                    id="feedback"
                                    value={feedback}
                                    onChange={(e) =>
                                        setFeedback(e.target.value)
                                    }
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    placeholder="Tulis feedback Anda..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleModalClose}
                                    className="px-4 py-2 text-sm text-white bg-red-700 hover:bg-red-800 rounded-md"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md"
                                >
                                    Kirim
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
