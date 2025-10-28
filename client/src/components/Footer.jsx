import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaShippingFast,
  FaLock,
  FaHeadset,
  FaRecycle,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <FaShippingFast className="text-[#01662c] text-xl" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Free Shipping
              </h4>
              <p className="text-gray-400 text-xs">On orders over $50</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaLock className="text-[#01662c] text-xl" />
            <div>
              <h4 className="font-semibold text-white text-sm">
                Secure Payment
              </h4>
              <p className="text-gray-400 text-xs">100% protected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaHeadset className="text-[#01662c] text-xl" />
            <div>
              <h4 className="font-semibold text-white text-sm">24/7 Support</h4>
              <p className="text-gray-400 text-xs">Customer care</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <FaRecycle className="text-[#01662c] text-xl" />
            <div>
              <h4 className="font-semibold text-white text-sm">Easy Returns</h4>
              <p className="text-gray-400 text-xs">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 BookHaven. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#01662c] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#01662c] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#01662c] transition-colors duration-300"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
