// frontend/src/components/Navbar.jsx

import React, { useState } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: 'home', icon: BookOpen },
    { name: 'Books', page: 'books' },
    { name: 'Genres', page: 'genres' },
  ];

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#e8dcc3] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-[#3d4f3d] w-10 h-10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#e8e89a]" />
            </div>
            <span className="text-2xl font-bold text-[#1a1a1a]">BookVerse</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors ${
                    currentPage === link.page
                      ? 'bg-[#3d4f3d] text-[#e8e89a]'
                      : 'text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a]'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            <button onClick={() => onNavigate('login')} className="bg-[#e8e89a] text-[#1a1a1a] px-6 py-2 rounded-full font-semibold hover:bg-[#d4d47a] transition-colors">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#3d4f3d]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className="block w-full text-left px-4 py-3 text-[#3d4f3d] hover:bg-[#3d4f3d] hover:text-[#e8e89a] rounded-lg font-semibold transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button onClick={() => onNavigate('login')} className="block w-full text-left px-4 py-3 bg-[#e8e89a] text-[#1a1a1a] rounded-lg font-semibold">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;