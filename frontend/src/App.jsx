import { useState } from "react";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BookDetail from "./pages/BookDetail";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentBookId, setCurrentBookId] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      case 'profile':
        return <Profile onNavigate={setCurrentPage} />;
      case 'book-detail':
        return <BookDetail isbn={currentBookId} onNavigate={setCurrentPage} />;
      case 'home':
      default:
        return <HomePage onNavigate={(page, id) => {
          if (id) setCurrentBookId(id);
          setCurrentPage(page);
        }} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}