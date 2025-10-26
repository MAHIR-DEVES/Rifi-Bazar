import { FaShoppingCart } from 'react-icons/fa';
import { GiBookmarklet, GiHoneyJar } from 'react-icons/gi';

function Navbar({ quantity, setShowCheckout }) {
  return (
    <nav className="bg-white shadow-lg top-0 z-50 sticky">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <GiHoneyJar className="text-3xl text-[#01662c]" />
            <span className="text-2xl font-bold text-gray-800">Rifi Bazar</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowCheckout(true)}
              className="bg-[#01662c] text-white px-6 py-2 rounded-full hover:bg-[#064e25] transition duration-300 flex items-center space-x-2"
            >
              <FaShoppingCart />
              <span>Checkout ({quantity})</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
