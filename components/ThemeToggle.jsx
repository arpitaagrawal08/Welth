'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

const ThemeToggle = () => {
  const { isSignedIn, user } = useUser();
  const [isDark, setIsDark] = useState(false);

  // Load saved theme (from Clerk or localStorage)
  useEffect(() => {
    let savedTheme;

    if (isSignedIn && user?.publicMetadata?.theme) {
      savedTheme = user.publicMetadata.theme;
    } else {
      savedTheme = localStorage.getItem('theme');
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = savedTheme || (prefersDark ? 'dark' : 'light');
    setIsDark(initial === 'dark');
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, [isSignedIn, user]);

  // Toggle theme & save it
  const toggleTheme = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);

    // Save to Clerk if signed in
    if (isSignedIn && user) {
      try {
        await user.update({
          publicMetadata: {
            theme: newTheme,
          },
        });
        toast.success(`Theme set to ${newTheme} ☀️🌙`);
      } catch (err) {
        console.error("Failed to update Clerk theme:", err);
        toast.error("Couldn't save theme to your profile.");
      }
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:scale-105 transition"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
