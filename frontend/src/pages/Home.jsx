import React, { useState } from 'react';
import { Search, BookOpen, Menu, X, Star, Book, Users, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Fiction', 'Non-Fiction', 'Sci-Fi', 'Mystery', 'Romance'];

  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.8,
      reviews: 1240,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
      category: "Fiction"
    },
    {
      id: 2,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.9,
      reviews: 856,
      cover: "https://images.unsplash.com/photo-1614544048536-0d28caf77f41?auto=format&fit=crop&q=80&w=400",
      category: "Sci-Fi"
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.9,
      reviews: 2100,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400",
      category: "Non-Fiction"
    }
  ];

  const handleSignOut = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#e8dcc3]">
      {/* Navigation */}
      <nav className="bg-[#3d4f3d] text-[#e8dcc3] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-[#e8e89a] p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-[#2a3b2a]" />
              </div>
              <span className="text-2xl font-bold tracking-tight">BookVerse</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="bg-[#2a3b2a] text-[#e8dcc3] placeholder-[#e8dcc3]/60 px-4 py-2 pl-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#e8e89a] w-64 transition-all"
                />
                <Search className="w-4 h-4 absolute left-3 top-3 text-[#e8dcc3]/60" />
              </div>
              <button onClick={() => onNavigate('books')} className="hover:text-[#e8e89a] transition-colors font-medium">View All Books</button>
              <button className="hover:text-[#e8e89a] transition-colors font-medium">My Library</button>
              <button className="hover:text-[#e8e89a] transition-colors font-medium">Community</button>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-[#e8e89a] font-medium">Hi, {user.username || user.fullName}</span>
                  <button
                    onClick={handleSignOut}
                    className="bg-[#e8e89a] text-[#2a3b2a] px-6 py-2.5 rounded-full font-bold hover:bg-[#d4d485] transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('login')}
                  className="bg-[#e8e89a] text-[#2a3b2a] px-6 py-2.5 rounded-full font-bold hover:bg-[#d4d485] transition-all transform hover:scale-105 shadow-md"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-[#2a3b2a] transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#2a3b2a] border-t border-[#3d4f3d]">
            <div className="px-4 pt-4 pb-6 space-y-4">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full bg-[#3d4f3d] text-[#e8dcc3] placeholder-[#e8dcc3]/60 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e8e89a]"
              />
              <button onClick={() => { onNavigate('books'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 hover:bg-[#3d4f3d] rounded-lg">View All Books</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-[#3d4f3d] rounded-lg">My Library</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-[#3d4f3d] rounded-lg">Community</button>
              {user ? (
                <>
                  <div className="px-4 py-2 text-[#e8e89a] font-medium">Hi, {user.username || user.fullName}</div>
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-[#e8e89a] text-[#2a3b2a] px-6 py-3 rounded-xl font-bold hover:bg-[#d4d485] transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-[#e8e89a] text-[#2a3b2a] px-6 py-3 rounded-xl font-bold hover:bg-[#d4d485] transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-[#2a3b2a] leading-tight">
              Discover Your Next <span className="text-[#3d4f3d]">Great Read</span>
            </h1>
            <p className="text-xl text-[#3d4f3d]/80 leading-relaxed">
              Join our community of book lovers. Track your reading, discover new favorites, and connect with readers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#3d4f3d] text-[#e8e89a] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2a3b2a] transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2">
                Start Reading <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-[#3d4f3d] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all border-2 border-[#3d4f3d] flex items-center justify-center gap-2">
                <Users className="w-5 h-5" /> Join Community
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#2a3b2a]">10k+</div>
                <div className="text-[#3d4f3d]">Active Readers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#2a3b2a]">50k+</div>
                <div className="text-[#3d4f3d]">Books Reviewed</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#e8e89a] rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800"
              alt="Library"
              className="relative rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-[#2a3b2a]">Featured Books</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all ${activeCategory === category
                  ? 'bg-[#3d4f3d] text-[#e8e89a]'
                  : 'bg-white text-[#3d4f3d] hover:bg-[#e8e89a]/20'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all group cursor-pointer">
              <div className="flex gap-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 py-2">
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-[#2a3b2a]">{book.rating}</span>
                    <span className="text-gray-400 text-sm">({book.reviews})</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#2a3b2a] mb-1 leading-tight">{book.title}</h3>
                  <p className="text-[#3d4f3d] font-medium mb-3">{book.author}</p>
                  <span className="inline-block bg-[#e8e89a]/30 text-[#3d4f3d] text-xs px-3 py-1 rounded-full font-semibold">
                    {book.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;