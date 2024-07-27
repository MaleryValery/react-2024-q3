import { initTheme } from '@/shared/consts/consts';
import { createContext, useContext } from 'react';

export const ThemeContext = createContext(initTheme);

const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useContext must be used within a ThemeProvider');
  }
  return context;
};

export default useThemeContext;
