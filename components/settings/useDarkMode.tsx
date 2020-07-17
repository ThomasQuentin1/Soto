import { useEffect, useState } from 'react';

/*
 * this is a home made hook to get the current color mode
 *
 * oldTheme? : string   take the old 
 * 
 * */
export const useDarkMode = () => {
  const [theme, setTheme] = useState<any>('light');

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
  };

  return [theme, toggleTheme]
};