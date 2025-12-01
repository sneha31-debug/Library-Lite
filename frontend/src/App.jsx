import { useState } from "react";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import Books from "./pages/Books";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [bookIsbn, setBookIsbn] = useState(null);

  const navigate = (page, isbn = null) => {
    setCurrentPage(page);
    if (isbn) setBookIsbn(isbn);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={navigate} />;
      case 'signup':
        return <Signup onNavigate={navigate} />;
      case 'books':
        return <Books onNavigate={navigate} />;
      case 'add-book':
        return <AddBook onNavigate={navigate} />;
      case 'book-detail':
        return <BookDetail isbn={bookIsbn} onNavigate={navigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}