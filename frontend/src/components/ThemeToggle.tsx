import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useThemeStore from '../store/themeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isGreenTheme = theme === 'green';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md ${
        isGreenTheme 
          ? 'hover:bg-theme-green-200 text-theme-green-700' 
          : 'hover:bg-gray-100 text-gray-600'
      } transition-colors`}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
