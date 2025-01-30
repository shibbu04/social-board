import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageIcon, LogOut, User, Users, Menu, X } from 'lucide-react';
import useAuthStore from '../store/authStore';
import ThemeToggle from './ThemeToggle';
import useThemeStore from '../store/themeStore';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { theme } = useThemeStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const isGreenTheme = theme === 'green';

  return (
    <nav className={`${isGreenTheme ? 'bg-theme-green-100' : 'bg-white'} border-b border-gray-100 sticky top-0 z-50 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              to="/"
              className={`flex items-center space-x-2 ${isGreenTheme ? 'text-theme-green-600 hover:text-theme-green-500' : 'text-indigo-600 hover:text-indigo-500'} transition-colors`}
            >
              <ImageIcon className="h-8 w-8" />
              <span className="font-bold text-xl">SocialBoard</span>
            </Link>
          </div>

          <button
            className={`md:hidden p-2 ${isGreenTheme ? 'text-theme-green-700 hover:text-theme-green-600' : 'text-gray-700 hover:text-indigo-600'} focus:outline-none`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isGreenTheme 
                      ? 'text-theme-green-700 hover:text-theme-green-600 hover:bg-theme-green-50' 
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  } transition-all`}
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                {user?.role === 'admin' || user?.role === 'superadmin' ? (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isGreenTheme 
                        ? 'text-theme-green-700 hover:text-theme-green-600 hover:bg-theme-green-50' 
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    } transition-all`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Admin</span>
                  </Link>
                ) : null}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 text-sm font-medium ${
                    isGreenTheme 
                      ? 'text-theme-green-600 hover:text-theme-green-500' 
                      : 'text-indigo-600 hover:text-indigo-500'
                  } transition-colors`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                    isGreenTheme 
                      ? 'bg-theme-green-600 hover:bg-theme-green-500' 
                      : 'bg-indigo-600 hover:bg-indigo-500'
                  } transition-colors`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className={`md:hidden ${isGreenTheme ? 'bg-theme-green-100' : 'bg-white'} border-t border-gray-200 py-2`}>
            <div className="flex flex-col space-y-2 px-4">
              <div className="flex justify-end py-2">
                <ThemeToggle />
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                      isGreenTheme 
                        ? 'text-theme-green-700 hover:text-theme-green-600 hover:bg-theme-green-50' 
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    } transition-all`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  {user?.role === 'admin' || user?.role === 'superadmin' ? (
                    <Link
                      to="/admin"
                      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                        isGreenTheme 
                          ? 'text-theme-green-700 hover:text-theme-green-600 hover:bg-theme-green-50' 
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                      } transition-all`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <Users className="h-4 w-4" />
                      <span>Admin</span>
                    </Link>
                  ) : null}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-500 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-4 py-2 text-sm font-medium ${
                      isGreenTheme 
                        ? 'text-theme-green-600 hover:text-theme-green-500' 
                        : 'text-indigo-600 hover:text-indigo-500'
                    } transition-colors`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                      isGreenTheme 
                        ? 'bg-theme-green-600 hover:bg-theme-green-500' 
                        : 'bg-indigo-600 hover:bg-indigo-500'
                    } transition-colors`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
