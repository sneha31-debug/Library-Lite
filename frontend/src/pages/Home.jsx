import React, { useState } from 'react';
import { BookOpen, Users, Heart, Menu, X, Star } from 'lucide-react';

const BookVerseWebsite = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const books = [
    {
      id: 1,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Thriller',
      year: 2019,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
      description: 'A gripping psychological thriller about a woman who shoots her husband and then never speaks again.'
    },
    {
      id: 2,
      title: 'Circe',
      author: 'Madeline Miller',
      genre: 'Mythology',
      year: 2018,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=600&fit=crop',
      description: 'In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child—not powerful, like her father, nor viciously alluring, like her...'
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      genre: 'Memoir',
      year: 2018,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop',
      description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family in the mountains of Idaho to pursue an education, and discovers the transformative...'
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      year: 1949,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop',
      description: 'A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.'
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Classic Literature',
      year: 1813,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop',
      description: 'A romantic novel of manners that follows the character development of Elizabeth Bennet.'
    },
    {
      id: 6,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Literary Fiction',
      year: 2020,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop',
      description: 'Between life and death there is a library, and within that library, the shelves go on forever.'
    }
  ];

  const genres = [
    {
      name: 'Mystery',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
      description: 'Unravel perplexing puzzles, follow cunning detectives, and delve into thrilling whodunits. This genre keeps readers on the edge of their seats with suspense, intrigue, and unexpected twists.'
    },
    {
      name: 'Historical Fiction',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=600&h=400&fit=crop',
      description: 'Journey back in time to experience pivotal moments and everyday life in bygone eras. Blending factual events with fictional narratives, these stories bring history to vivid life.'
    },
    {
      name: 'Science Fiction',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      description: 'Venture into the future, explore distant galaxies, and ponder the impact of advanced technology. This genre challenges perceptions with speculative ideas, futuristic societies, and scientific possibilities.'
    },
    {
      name: 'Fantasy',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop',
      description: 'Enter magical realms filled with mythical creatures, epic quests, and supernatural powers. Fantasy transports readers to imaginative worlds beyond reality.'
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
              <div key={book.id} className="bg-[#e8dcc3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
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

  const GenresPage = () => (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">Explore by Genre</h1>
        <p className="text-[#3d4f3d] text-center mb-12 text-lg">Dive into carefully curated collections spanning every literary taste and preference.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {genres.map((genre, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={genre.image}
                  alt={genre.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-[#e8dcc3] mb-2">{genre.name}</h3>
                  <p className="text-[#e8dcc3] text-sm">{genre.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BooksPage = () => (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-[#e8dcc3]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">All Books</h1>
        <p className="text-[#3d4f3d] text-center mb-12 text-lg">Browse our complete collection of literary treasures.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map(book => (
            <div key={book.id} className="bg-[#e8dcc3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-[#e8e89a] text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-semibold">
                  {book.year}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#3d4f3d] text-[#e8e89a] text-xs px-3 py-1 rounded-full">{book.genre}</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <Star className="w-4 h-4 fill-[#e8e89a] text-[#e8e89a]" />
                    <span className="text-sm font-semibold text-[#3d4f3d]">{book.rating}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">{book.title}</h3>
                <p className="text-[#3d4f3d] text-sm">by {book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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

            <div className="hidden md:block">
              <button onClick={() => onNavigate('login')} className="bg-[#e8e89a] text-[#1a1a1a] px-6 py-2 rounded-full font-semibold hover:bg-[#d4d47a] transition-colors">
                Sign In
              </button>
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
              <button onClick={() => onNavigate('login')} className="block w-full text-left px-4 py-3 bg-[#e8e89a] text-[#1a1a1a] rounded-lg font-semibold">
                Sign In
              </button>
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