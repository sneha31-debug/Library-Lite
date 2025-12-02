import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Calendar, User, FileText, X } from 'lucide-react';
import api from '../services/api';

const BookDetail = () => {
    const { isbn } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPdf, setShowPdf] = useState(false);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                // Fetch from API
                const response = await api.get(`/books/library/${isbn}`);
                setBook(response.data.book);
            } catch (err) {
                console.error("Error fetching book details:", err);
                setError("Failed to load book details.");
            } finally {
                setLoading(false);
            }
        };

        if (isbn) {
            fetchBookDetails();
        }
    }, [isbn]);

    if (loading) return <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center text-[#3d4f3d]">Loading...</div>;
    if (error) return <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center text-red-600">{error}</div>;
    if (!book) return <div className="min-h-screen bg-[#e8dcc3] flex items-center justify-center text-[#3d4f3d]">Book not found</div>;

    const pdfUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/books/library/${isbn}/pdf`;

    return (
        <div className="min-h-screen bg-[#e8dcc3] py-8 px-4 md:px-8 lg:px-16">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-[#3d4f3d] font-semibold mb-8 hover:text-[#2a3b2a] transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                Back to Books
            </button>

            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="grid md:grid-cols-3 gap-8 p-8">
                    {/* Book Cover */}
                    <div className="md:col-span-1">
                        <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                            <img
                                src={book.image || book.coverImage}
                                alt={book.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => setShowPdf(true)}
                                className="w-full bg-[#3d4f3d] text-[#e8e89a] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#2a3b2a] transition-colors"
                            >
                                <BookOpen className="w-5 h-5" />
                                Read Book
                            </button>
                        </div>
                    </div>

                    {/* Book Info */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-[#e8e89a] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-semibold">
                                    {book.genre}
                                </span>
                                <div className="flex items-center gap-1 text-[#3d4f3d]">
                                    <Star className="w-5 h-5 fill-[#e8e89a] text-[#e8e89a]" />
                                    <span className="font-bold">{book.rating || book.averageRating || 'N/A'}</span>
                                </div>
                            </div>

                            <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">{book.title}</h1>
                            <div className="flex items-center gap-2 text-[#5a5a5a] text-lg">
                                <User className="w-5 h-5" />
                                <span>{book.author}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-100">
                            <div>
                                <div className="text-[#5a5a5a] text-sm mb-1">Published</div>
                                <div className="font-semibold text-[#1a1a1a]">{book.year || book.publishedDate || 'Unknown'}</div>
                            </div>
                            <div>
                                <div className="text-[#5a5a5a] text-sm mb-1">Pages</div>
                                <div className="font-semibold text-[#1a1a1a]">{book.pageCount || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="text-[#5a5a5a] text-sm mb-1">Language</div>
                                <div className="font-semibold text-[#1a1a1a]">{book.language || 'English'}</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">Description</h3>
                            <p className="text-[#5a5a5a] leading-relaxed">
                                {book.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Viewer Modal */}
            {showPdf && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-white w-full h-full max-w-6xl rounded-2xl overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#f8f9fa]">
                            <h3 className="font-bold text-[#1a1a1a] truncate">{book.title}</h3>
                            <button
                                onClick={() => setShowPdf(false)}
                                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-[#5a5a5a]" />
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100 relative">
                            <iframe
                                src={`${pdfUrl}#toolbar=0`}
                                className="w-full h-full"
                                title="PDF Viewer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookDetail;
