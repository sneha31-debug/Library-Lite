import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function BookDetail() {
    const { isbn } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookDetails = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/books/library/${isbn}`, {
                withCredentials: true
            });
            if (response.data.success) {
                setBook(response.data.book);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load book details');
        } finally {
            setLoading(false);
        }
    }, [isbn]);

    useEffect(() => {
        fetchBookDetails();
    }, [fetchBookDetails]);

    const handlePreview = () => {
        window.open(`${API_URL}/books/library/${isbn}/preview`, '_blank');
    };

    const handleDownload = () => {
        window.location.href = `${API_URL}/books/library/${isbn}/pdf`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-600">{error || 'Book not found'}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/books')}
                    className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                    ← Back to Books
                </button>

                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="md:flex">
                        {book.thumbnail && (
                            <div className="md:w-1/3 p-6">
                                <img
                                    src={book.thumbnail}
                                    alt={book.title}
                                    className="w-full rounded-lg shadow-md"
                                />
                            </div>
                        )}

                        <div className={`${book.thumbnail ? 'md:w-2/3' : 'w-full'} p-6`}>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                            <p className="text-lg text-gray-600 mb-4">{book.authors || book.author}</p>

                            {book.description && (
                                <div className="mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
                                    <p className="text-gray-700">{book.description}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                                {book.publishedDate && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Published:</span>
                                        <span className="ml-2 text-gray-600">{book.publishedDate}</span>
                                    </div>
                                )}
                                {book.pageCount && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Pages:</span>
                                        <span className="ml-2 text-gray-600">{book.pageCount}</span>
                                    </div>
                                )}
                                {book.language && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Language:</span>
                                        <span className="ml-2 text-gray-600">{book.language}</span>
                                    </div>
                                )}
                                {book.categories && (
                                    <div>
                                        <span className="font-semibold text-gray-700">Categories:</span>
                                        <span className="ml-2 text-gray-600">{book.categories}</span>
                                    </div>
                                )}
                            </div>

                            {(book.averageRating > 0 || book.totalRatings > 0) && (
                                <div className="mb-6">
                                    <span className="font-semibold text-gray-700">Rating:</span>
                                    <span className="ml-2 text-yellow-500">★ {book.averageRating}</span>
                                    <span className="ml-2 text-gray-600">({book.totalRatings} ratings)</span>
                                </div>
                            )}

                            {/* PDF Actions */}
                            {(book.pdfUrl || book.previewUrl) && (
                                <div className="border-t pt-6 mt-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">PDF Actions</h2>
                                    <div className="flex gap-4">
                                        {book.previewUrl && (
                                            <button
                                                onClick={handlePreview}
                                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                            >
                                                📖 Preview (First 5 Pages)
                                            </button>
                                        )}
                                        {book.pdfUrl && (
                                            <button
                                                onClick={handleDownload}
                                                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                                            >
                                                ⬇️ Download Full PDF
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
