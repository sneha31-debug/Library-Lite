// frontend/src/pages/Genres.jsx

import React from 'react';
import { genresData } from '../services/data'; // Import static data

const Genres = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">Explore by Genre</h1>
        <p className="text-[#3d4f3d] text-center mb-12 text-lg">Dive into carefully curated collections spanning every literary taste and preference.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {genresData.map((genre, index) => (
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
};

export default Genres;