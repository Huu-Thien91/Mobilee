// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Tạo context để quản lý trạng thái dark mode
const ThemeContext = createContext();

// Provider để cung cấp trạng thái dark mode cho các component con
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook để sử dụng trạng thái dark mode ở các component con
export const useTheme = () => useContext(ThemeContext);
