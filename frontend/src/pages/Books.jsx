import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { booksData } from "../services/data"; // Static data for now

const Books = ({ onNavigate }) => {
  // 💡 Placeholder for future API integration
  const [books, setBooks] = useState(booksData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchBooks = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await api.get('/books'); // ⬅️ Connect to backend API
  //       setBooks(response.data.books);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Failed to fetch books.');
  //       setLoading(false);
  //     }
  //   };
  //   fetchBooks();
  // }, []);

  // if (loading) return <div className="text-center py-20">Loading books...</div>;
  // if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-[#e8dcc3]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">
          All Books
        </h1>
        <p className="text-[#3d4f3d] text-center mb-12 text-lg">
          Browse our complete collection of literary treasures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            // NOTE: BookCard uses a slightly different structure than the original All Books page,
            // but the reusable component is better.
            <div key={book.id} onClick={() => onNavigate('book-detail', book.isbn || book.id)}>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
