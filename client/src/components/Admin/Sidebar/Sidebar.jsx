import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaBox,
  FaPlusCircle,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaHome,
  FaChartLine,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <FaTachometerAlt className="w-5 h-5" />,
      badge: null,
    },
    {
      path: '/admin/all-products',
      name: 'All Products',
      icon: <FaBox className="w-5 h-5" />,
      badge: '24',
    },
    {
      path: '/admin/add-product',
      name: 'Add Product',
      icon: <FaPlusCircle className="w-5 h-5" />,
      badge: null,
    },
    {
      path: '/admin/orders',
      name: 'Orders',
      icon: <FaShoppingCart className="w-5 h-5" />,
      badge: '5',
    },
  ];

  const isActive = path => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin-login';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          bg-gradient-to-b from-gray-900 to-gray-800 text-white w-72 transform transition-all duration-300 ease-in-out
          shadow-2xl lg:shadow-xl border-r border-gray-700
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 mt-12 md:mt-0 bg-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center relative shadow-lg">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">RB</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-gray-900 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rifi Bazer
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-gray-700 bg-gray-800">
          <div className="bg-gray-750 rounded-xl p-4 shadow-inner">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-300 text-sm font-medium">
                Today's Orders
              </span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-md">
                12
              </span>
            </div>
            {/* <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm font-medium">Revenue</span>
              <span className="text-white text-sm font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                $2,847
              </span>
            </div> */}
            <div className="mt-3 pt-3 border-t border-gray-600">
              <div className="flex items-center text-xs text-gray-400">
                <FaChartLine className="w-3 h-3 mr-1 text-green-400" />
                <span>+12% from yesterday</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-2 ml-4">
              Main Menu
            </h3>
          </div>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.path || item.name}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center justify-between p-3 rounded-xl transition-all duration-200 group relative overflow-hidden
                    ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                        : 'text-gray-300 hover:bg-gray-750 hover:text-white hover:translate-x-1'
                    }
                  `}
                  onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                >
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"></div>
                  )}

                  <div className="flex items-center space-x-3">
                    <div
                      className={`${
                        isActive(item.path) ? 'text-white' : 'text-gray-400'
                      } group-hover:text-white`}
                    >
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span
                        className={`
                          text-xs px-2 py-1 rounded-full font-bold min-w-6 text-center
                          ${
                            isActive(item.path)
                              ? 'bg-white text-blue-600'
                              : 'bg-gray-700 text-gray-300'
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}
                    {!isActive(item.path) && (
                      <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400" />
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Actions */}
        <div className="p-4 border-t border-gray-700 bg-gray-800 space-y-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 bg-gray-750 rounded-xl shadow-inner">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                Admin User
              </p>
              <p className="text-gray-400 text-xs truncate">
                admin@chashmaexpress.com
              </p>
            </div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gray-750 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200 text-sm font-medium group hover:shadow-md"
            >
              <FaHome className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Home</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg rounded-lg transition-all duration-200 text-sm font-medium group hover:scale-105"
            >
              <FaSignOutAlt className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
