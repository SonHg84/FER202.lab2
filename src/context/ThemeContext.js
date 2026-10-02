import { createContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [savedDarkMode, setDarkMode] = useLocalStorage('mini-movie-manager-theme', false);
  const darkMode = savedDarkMode === true;

  const toggleTheme = useCallback(() => {
    setDarkMode((previous) => previous !== true);
  }, [setDarkMode]);

  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
