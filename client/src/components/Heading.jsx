import React, { useState, useEffect } from 'react';

const Heading = ({ onBuyNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image:
        'https://www.smartpack-eg.com/rec/upload/7a007e25ca7be8ed0ba1e775a019ca0b.jpg',
      title: 'Pure Date Molasses',
      description:
        '100% Natural & Organic Date Syrup - Rich in Nutrients and Natural Sweetness',
      badge: 'NATURAL',
    },
    {
      id: 2,
      image:
        'https://media.istockphoto.com/id/2030099577/photo/pouring-molasses-from-dipper.jpg?s=612x612&w=0&k=20&c=NPz7fRRj67cwNes82nt2vw3enwKqRATcIuk4CDfAjrs=',
      title: 'Traditional Recipe',
      description:
        'Made with Ancient Methods to Preserve Authentic Flavor and Health Benefits',
      badge: 'TRADITIONAL',
    },
    {
      id: 3,
      image: 'https://observerbd.com/2024/12/24/ob_1735048713.jpg',
      title: 'Premium Quality',
      description:
        'Carefully Selected Dates for the Finest Molasses - No Additives or Preservatives',
      badge: 'PREMIUM',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = index => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-7xl mx-auto  pb-12">
      {/* Slider Section */}
      <div className="relative mb-16">
        <div className="relative h-[40vh] min-h-[500px]  overflow-hidden shadow-2xl">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 transform translate-x-0'
                  : 'opacity-0 transform translate-x-full'
              }`}
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-2xl ml-8 md:ml-16 text-white">
                  {/* Badge */}
                  <div className="inline-block bg-[#01662c] text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <button
                    onClick={onBuyNow}
                    className="bg-[#01662c] text-white text-lg font-semibold px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-amber-500/25"
                  >
                    🍯 Shop Now - Taste the Natural Goodness
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 border-white ${
                  index === currentSlide
                    ? 'bg-amber-400 scale-125 border-amber-400'
                    : 'bg-transparent hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
              style={{
                width: `${((currentSlide + 1) / slides.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200 text-center">
            <div className="text-3xl mb-3">🌿</div>
            <h3 className="font-bold text-gray-900 mb-2">100% Natural</h3>
            <p className="text-gray-600 text-sm">
              No additives or preservatives
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200 text-center">
            <div className="text-3xl mb-3">🥄</div>
            <h3 className="font-bold text-gray-900 mb-2">Rich in Nutrients</h3>
            <p className="text-gray-600 text-sm">
              Packed with vitamins & minerals
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-200 text-center">
            <div className="text-3xl mb-3">🚚</div>
            <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On orders above ৳ 500</p>
          </div>
        </div>
      </div>

      {/* Product Features Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-amber-200">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Why Choose Our Date Molasses?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 shadow-md mb-3 inline-block">
              <span className="text-2xl">🍯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Pure Quality</h4>
            <p className="text-gray-600 text-sm">
              Made from finest quality dates
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 shadow-md mb-3 inline-block">
              <span className="text-2xl">💪</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Energy Boost</h4>
            <p className="text-gray-600 text-sm">Natural source of energy</p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 shadow-md mb-3 inline-block">
              <span className="text-2xl">❤️</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Heart Healthy</h4>
            <p className="text-gray-600 text-sm">
              Supports cardiovascular health
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl p-4 shadow-md mb-3 inline-block">
              <span className="text-2xl">🌱</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Vegan Friendly</h4>
            <p className="text-gray-600 text-sm">Suitable for all diets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
