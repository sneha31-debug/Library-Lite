import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Heart, Menu, X, Star, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const BookVerseWebsite = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const _handleLogout = async () => {
    await logout();
    setCurrentPage('home');
  };

  const books = [
    {
      id: 1,
      title: 'The Digital Revolution',
      author: 'Sarah Thompson',
      genre: 'Technology',
      year: 2023,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400',
      description: 'An in-depth exploration of how digital transformation is reshaping our world.',
      isbn: '978-1-234567-89-0'
    },
    {
      id: 2,
      title: 'The Art of Mindfulness',
      author: 'Maya Patel',
      genre: 'Self-Help',
      year: 2022,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      description: 'A practical guide to incorporating mindfulness into daily life.',
      isbn: '978-2-345678-90-1'
    },
    {
      id: 3,
      title: 'Introduction to Data Science',
      author: 'Dr. James Chen',
      genre: 'Computer Science',
      year: 2023,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      description: 'A comprehensive introduction to data science.',
      isbn: '978-3-456789-01-2'
    },
    {
      id: 4,
      title: 'The Psychology of Success',
      author: 'Dr. Emily Rodriguez',
      genre: 'Psychology',
      year: 2022,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      description: 'Explore the mental frameworks and habits that lead to success.',
      isbn: '978-4-567890-12-3'
    },
    {
      id: 5,
      title: 'Modern Web Development',
      author: 'Alex Kumar',
      genre: 'Programming',
      year: 2023,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400',
      description: 'Master modern web development with React, Node.js, and cloud technologies.',
      isbn: '978-5-678901-23-4'
    },
    {
      id: 6,
      title: 'Climate Change',
      author: 'Dr. Lisa Anderson',
      genre: 'Science',
      year: 2023,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400',
      description: 'Understanding the science behind climate change.',
      isbn: '978-6-789012-34-5'
    }
  ];



  const stats = [
    { icon: BookOpen, value: '1,000+', label: 'Books Available' },
    { icon: Users, value: '5,000+', label: 'Active Readers' },
    { icon: Heart, value: '10,000+', label: 'Reviews Shared' }
  ];

  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-br from-[#3d4f3d] to-[#2a3b2a] rounded-3xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-[#e8e89a] mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#1a1a1a]">
              Discover Your Next<br />
              <span className="text-[#e8e89a]">Literary Adventure</span>
            </h1>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop"
              alt="Library"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8">
          <p className="text-[#3d4f3d] text-lg md:text-xl text-center md:text-left max-w-3xl">
            Immerse yourself in a curated collection of timeless classics and contemporary masterpieces. Track your reading journey, connect with fellow book enthusiasts, and build your personal library.
          </p>
          <div className="flex gap-4 mt-8 justify-center md:justify-start">
            <button
              onClick={() => setCurrentPage('books')}
              className="bg-[#e8e89a] text-[#1a1a1a] px-8 py-3 rounded-full font-semibold hover:bg-[#d4d47a] transition-colors"
            >
              Explore Books
            </button>
            <button className="border-2 border-[#3d4f3d] text-[#3d4f3d] px-8 py-3 rounded-full font-semibold hover:bg-[#3d4f3d] hover:text-[#e8dcc3] transition-colors">
              My Library
            </button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#e8dcc3]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center mb-4">Featured Books</h2>
          <p className="text-[#3d4f3d] text-center mb-12">Handpicked selections from our literary collection, perfect for your next reading adventure.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.slice(0, 6).map(book => (
              <div
                key={book.id}
                className="bg-[#e8dcc3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
                onClick={() => navigate(`/book/${book.isbn}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#e8e89a] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-semibold">
                    {book.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#3d4f3d] text-[#e8e89a] text-xs px-3 py-1 rounded-full">{book.genre}</span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="w-4 h-4 fill-[#e8e89a] text-[#e8e89a]" />
                      <span className="text-sm font-semibold text-[#3d4f3d]">{book.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{book.title}</h3>
                  <p className="text-[#3d4f3d] text-sm mb-3">by {book.author}</p>
                  <p className="text-[#5a5a5a] text-sm line-clamp-2">{book.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage('books')}
              className="bg-[#3d4f3d] text-[#e8e89a] px-10 py-4 rounded-full font-semibold hover:bg-[#2a3b2a] transition-colors"
            >
              View All Books
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-[#3d4f3d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e8dcc3] text-center mb-4">Join Our Reading Community</h2>
          <p className="text-[#e8dcc3] text-center mb-12">Connect with fellow book lovers, share reviews, and discover your next favorite read.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-[#e8e89a] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-[#3d4f3d]" />
                  </div>
                  <div className="text-4xl font-bold text-[#e8dcc3] mb-2">{stat.value}</div>
                  <div className="text-[#e8dcc3]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );

  // Function to get genre-specific images
  const getGenreImage = (genreName) => {
    const genreImageMap = {
      'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop', // Circuit board/tech
      'Self-Help': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop', // Meditation/mindfulness
      'Computer Science': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop', // Code on screen
      'Psychology': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop', // Brain/psychology
      'Programming': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop', // Programming code
      'Science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop', // Laboratory/science
      'Business': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop', // Business meeting/office
      'Philosophy': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop', // Ancient books/philosophy
      'Writing': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop', // Typewriter/writing
      'Health': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop', // Healthy food/wellness
      'Fantasy': 'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&h=400&fit=crop', // Magical/fantasy landscape
      'Urban Fantasy': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop', // Dark city/urban night
      'Crime / Thriller': 'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?w=600&h=400&fit=crop', // Dark alley/crime scene
      'Political Thriller': 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop', // Government building
      'Contemporary Fiction': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop', // Modern library
      'Classic Literature': 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop', // Vintage books
    };

    // Return genre-specific image or a default book-related image
    return genreImageMap[genreName] || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&h=400&fit=crop';
  };

  const GenresPage = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchGenres = async () => {
        try {
          const response = await api.get('/books/genres');
          setGenres(response.data.genres || []);
        } catch (error) {
          console.error('Error fetching genres:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchGenres();
    }, []);

    const handleGenreClick = (genreName) => {
      setCurrentPage('books');
      // We'll pass the genre via a state update that BooksPage can read
      window.history.pushState({ genre: genreName }, '', `/?genre=${genreName}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
      <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">Explore by Genre</h1>
          <p className="text-[#3d4f3d] text-center mb-12 text-lg">Dive into carefully curated collections spanning every literary taste and preference.</p>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3d4f3d] mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {genres.map((genreName, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => handleGenreClick(genreName)}
                >
                  <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={getGenreImage(genreName)}
                      alt={genreName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-[#e8dcc3] mb-2">{genreName}</h3>
                      <p className="text-[#e8dcc3] text-sm">Click to explore {genreName} books</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const BooksPage = () => {
    const [libraryBooks, setLibraryBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null);

    useEffect(() => {
      const fetchBooks = async () => {
        setLoading(true);
        try {
          // Check for genre in URL
          const urlParams = new URLSearchParams(window.location.search);
          const genreParam = urlParams.get('genre');

          let endpoint = '/books/library';
          if (genreParam) {
            endpoint += `?genre=${encodeURIComponent(genreParam)}`;
            setSelectedGenre(genreParam);
          } else {
            setSelectedGenre(null);
          }

          const response = await api.get(endpoint);
          setLibraryBooks(response.data.books || []);
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchBooks();

      // Listen for popstate events (back/forward navigation)
      const handlePopState = () => {
        fetchBooks();
      };
      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }, []);

    const clearGenreFilter = () => {
      setSelectedGenre(null);
      window.history.pushState({}, '', '/');
      setLoading(true);
      api.get('/books/library')
        .then(response => {
          setLibraryBooks(response.data.books || []);
        })
        .catch(error => {
          console.error('Error fetching books:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    return (
      <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-[#e8dcc3]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">
            {selectedGenre ? `${selectedGenre} Books` : 'All Books'}
          </h1>
          <p className="text-[#3d4f3d] text-center mb-8 text-lg">
            {selectedGenre
              ? `Explore our collection of ${selectedGenre} books.`
              : 'Browse our complete collection of literary treasures.'}
          </p>

          {selectedGenre && (
            <div className="flex justify-center mb-8">
              <button
                onClick={clearGenreFilter}
                className="bg-[#3d4f3d] text-[#e8e89a] px-6 py-2 rounded-full font-semibold hover:bg-[#2a3b2a] transition-colors flex items-center gap-2"
              >
                <span>×</span> Clear Filter
              </button>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3d4f3d] mx-auto"></div>
            </div>
          ) : libraryBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#3d4f3d] text-lg">No books found{selectedGenre ? ` in ${selectedGenre} genre` : ''}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {libraryBooks.map(book => (
                <div
                  key={book.id}
                  className="bg-[#e8dcc3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group flex flex-col h-full cursor-pointer"
                  onClick={() => navigate(`/book/${book.isbn}`)}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={book.coverImage || book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#3d4f3d] text-[#e8e89a] text-xs px-3 py-1 rounded-full">{book.genre}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-1 line-clamp-2">{book.title}</h3>
                    <p className="text-[#3d4f3d] text-sm mb-4">by {book.author}</p>

                    <div className="mt-auto pt-4 border-t border-[#3d4f3d]/10">
                      {book.pdfUrl && (
                        <a
                          href={book.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full text-center bg-[#3d4f3d] text-[#e8e89a] py-2 rounded-lg font-semibold hover:bg-[#2a3b2a] transition-colors"
                        >
                          Read Book
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-[#2a3b2a] text-[#e8dcc3] py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#e8e89a] w-12 h-12 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#2a3b2a]" />
            </div>
            <span className="text-2xl font-bold">BookVerse</span>
          </div>
          <p className="text-sm mb-4">Your digital sanctuary for literary exploration. Discover, track, and share your reading journey with a community of passionate book lovers.</p>
          <p className="text-xs flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#e8e89a]" />
            Made with love for book enthusiasts
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">All Books</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Genres</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">New Releases</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Popular</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Join Us</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Book Reviews</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Reading Lists</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Favorites</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#e8e89a] transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-[#3d4f3d] text-center text-sm">
        <p>© 2025 BookVerse. All rights reserved.</p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-[#e8dcc3]">
      {/* Navigation */}
      <nav className="bg-[#e8dcc3] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="bg-[#3d4f3d] w-10 h-10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#e8e89a]" />
              </div>
              <span className="text-2xl font-bold text-[#1a1a1a]">BookVerse</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${currentPage === 'home' ? 'bg-[#3d4f3d] text-[#e8e89a]' : 'text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a]'}`}
              >
                <BookOpen className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={() => setCurrentPage('books')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${currentPage === 'books' ? 'bg-[#3d4f3d] text-[#e8e89a]' : 'text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a]'}`}
              >
                Books
              </button>
              <button
                onClick={() => setCurrentPage('genres')}
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${currentPage === 'genres' ? 'bg-[#3d4f3d] text-[#e8e89a]' : 'text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a]'}`}
              >
                Genres
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3d4f3d] text-[#e8e89a] rounded-full hover:bg-[#2a3b2a] transition-colors"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-semibold">{user.fullName || user.username}</span>
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="bg-[#e8e89a] text-[#1a1a1a] px-6 py-2 rounded-full font-semibold hover:bg-[#d4d47a] transition-colors">
                  Sign In
                </button>
              )}
            </div>

            <button
              className="md:hidden text-[#3d4f3d]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a] rounded-lg font-semibold transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('books'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a] rounded-lg font-semibold transition-colors"
              >
                Books
              </button>
              <button
                onClick={() => { setCurrentPage('genres'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-3 text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a] rounded-lg font-semibold transition-colors"
              >
                Genres
              </button>
              {user ? (
                <button
                  onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                  className="block w-full text-left px-4 py-3 bg-[#3d4f3d] text-[#e8e89a] rounded-lg font-semibold flex items-center gap-2"
                >
                  <UserIcon className="w-5 h-5" />
                  {user.fullName || user.username}
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="block w-full text-left px-4 py-3 bg-[#e8e89a] text-[#1a1a1a] rounded-lg font-semibold">
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'genres' && <GenresPage />}
      {currentPage === 'books' && <BooksPage />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BookVerseWebsite;