// components/ThemeProvider.jsx
'use client';
import { useEffect } from 'react';

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return children;
};

export default ThemeProvider;
