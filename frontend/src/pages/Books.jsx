import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            // First try to get all books from the database via API
            const response = await axios.get(`${API_URL}/books/library`);

            if (response.data.success || response.data.books) {
                setBooks(response.data.books || []);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    const handleBookClick = (book) => {
        // For now, open preview in new tab
        if (book.previewUrl) {
            window.open(`http://localhost:5001${book.previewUrl}`, '_blank');
        }
    };

    const handleDownload = (book, e) => {
        e.stopPropagation();
        if (book.pdfUrl) {
            window.location.href = `http://localhost:5001${book.pdfUrl}`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading books...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Library Books</h1>
                    <p className="mt-2 text-gray-600">Browse our collection of {books.length} books</p>
                </div>

                {books.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No books available yet.</p>
                        <p className="text-gray-400 mt-2">Upload some books to get started!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => handleBookClick(book)}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                            >
                                {book.thumbnail && (
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                        className="w-full h-64 object-cover"
                                    />
                                )}

                                <div className="p-4">
                                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                                        {book.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mb-2">{book.authors}</p>

                                    {book.description && (
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-3">
                                            {book.description}
                                        </p>
                                    )}

                                    {book.categories && (
                                        <div className="mb-3">
                                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                {book.categories.split(',')[0].trim()}
                                            </span>
                                        </div>
                                    )}

                                    {(book.pdfUrl || book.previewUrl) && (
                                        <div className="flex gap-2 mt-4">
                                            {book.previewUrl && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(`http://localhost:5001${book.previewUrl}`, '_blank');
                                                    }}
                                                    className="flex-1 bg-blue-600 text-white text-sm py-2 px-3 rounded hover:bg-blue-700"
                                                >
                                                    📖 Preview
                                                </button>
                                            )}
                                            {book.pdfUrl && (
                                                <button
                                                    onClick={(e) => handleDownload(book, e)}
                                                    className="flex-1 bg-green-600 text-white text-sm py-2 px-3 rounded hover:bg-green-700"
                                                >
                                                    ⬇️ Download
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
