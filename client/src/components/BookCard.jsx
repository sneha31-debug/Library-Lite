import React from "react";
import { Star } from "lucide-react";

const BookCard = ({ book }) => {
  return (
    <div
      key={book.id}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
    >
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
          <span className="bg-[#3d4f3d] text-[#e8e89a] text-xs px-3 py-1 rounded-full">
            {book.genre}
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <Star className="w-4 h-4 fill-[#e8e89a] text-[#e8e89a]" />
            <span className="text-sm font-semibold text-[#3d4f3d]">
              {book.rating}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">{book.title}</h3>
        <p className="text-[#3d4f3d] text-sm mb-3">by {book.author}</p>
        <p className="text-[#5a5a5a] text-sm line-clamp-2">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
