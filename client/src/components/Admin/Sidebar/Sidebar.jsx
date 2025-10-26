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
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  const hasActiveChild = submenu => {
    return submenu?.some(item => isActive(item.path));
  };

  const toggleDropdown = index => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handelLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin-login';
  };

  return (
    <>
      {/* Mobile Menu Button open */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isOpen ? (
          <FaTimes className="w-5 h-5" />
        ) : (
          <FaBars className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar  */}
      <div
        className={`
          fixed  lg:static inset-y-0 left-0 z-40
          bg-gradient-to-b from-[#831010] to-[#B91C1C]
          text-white w-72 transform transition-all duration-300 ease-in-out
          shadow-2xl lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
          flex flex-col 
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-red-600 mt-12 md:mt-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-white to-red-100 rounded-xl flex items-center justify-center relative shadow-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <div className="absolute top-1 left-1 w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg">Chashma Express BD</span>
              <span className="text-xs text-red-200 font-medium">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-red-600">
          <div className="bg-red-800 bg-opacity-40 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-red-200 text-sm">Today's Orders</span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                12
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-red-200 text-sm">Revenue</span>
              <span className="text-white text-sm font-bold">$2,847</span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={item.path || item.name}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`
                        flex items-center justify-between w-full p-4 rounded-xl transition-all duration-200
                        ${
                          hasActiveChild(item.submenu)
                            ? 'bg-white text-red-700 font-semibold shadow-lg'
                            : 'text-red-100 hover:bg-red-700 hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <FaChevronRight
                          className={`w-3 h-3 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-90' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`
                      overflow-hidden transition-all duration-300
                      ${
                        activeDropdown === index
                          ? 'max-h-48 opacity-100'
                          : 'max-h-0 opacity-0'
                      }
                    `}
                    >
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.submenu.map(subItem => (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`
                                flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                                ${
                                  isActive(subItem.path)
                                    ? 'bg-red-800 text-white font-medium'
                                    : 'text-red-200 hover:bg-red-700 hover:text-white'
                                }
                              `}
                              onClick={() =>
                                window.innerWidth < 1024 && setIsOpen(false)
                              }
                            >
                              <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                              <span className="text-sm">{subItem.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`
                      flex items-center justify-between p-4 rounded-xl transition-all duration-200 group
                      ${
                        isActive(item.path)
                          ? 'bg-white text-red-700 font-semibold shadow-lg transform scale-[1.02]'
                          : 'text-red-100 hover:bg-red-700 hover:text-white hover:translate-x-1'
                      }
                    `}
                    onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span
                          className={`
                          text-xs px-2 py-1 rounded-full font-bold
                          ${
                            isActive(item.path)
                              ? 'bg-red-100 text-red-700'
                              : 'bg-red-500 text-white'
                          }
                        `}
                        >
                          {item.badge}
                        </span>
                      )}
                      {!isActive(item.path) && (
                        <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-red-600 space-y-4">
          {/* User Profile */}
          <div className="flex items-center space-x-3 p-3 bg-red-800 bg-opacity-40 rounded-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                Admin User
              </p>
              <p className="text-red-200 text-xs truncate">
                admin@chashmaexpress.com
              </p>
            </div>
          </div>

          {/* Back to Home & Logout */}
          <div className="flex space-x-2">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center space-x-2 p-3 text-red-200 hover:bg-red-700 hover:text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <FaHome className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <button
              onClick={handelLogout}
              className="flex-1 flex items-center justify-center space-x-2 p-3 text-red-200 hover:bg-red-500 hover:text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
