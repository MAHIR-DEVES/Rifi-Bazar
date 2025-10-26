import React from 'react';
import { FaCheck, FaShoppingCart, FaStar } from 'react-icons/fa';

const BookDetails = ({ books, onBuyNow }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map(book => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Book Image */}
            <div className="relative w-full h-64">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <div className="absolute top-3 left-3 bg-[#01662c] text-white px-4 py-1 rounded-full text-sm font-semibold">
                {book.features[0]}
              </div>
            </div>

            {/* Book Details */}
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {book.title}
              </h3>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(book.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">({book.reviews} reviews)</span>
              </div>

              {/* <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-indigo-600">
                  {book.price} Tk
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {book.originalPrice} Tk
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold text-sm">
                  Save {(book.originalPrice - book.price).toFixed(2)} Tk
                </span>
              </div> */}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  onClick={() => onBuyNow(book)}
                  className="flex-1 bg-[#01662c] text-white py-3 rounded-lg font-semibold hover:bg-[#074e26] transition duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <FaShoppingCart />
                  <span>Buy Now </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetails;
