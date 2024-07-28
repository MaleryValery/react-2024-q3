import { ReactNode, useState } from 'react';
import { ThemeContext } from './ContextTheme';

function ContextThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const handleTheme = () => {
    setIsDark((prev: boolean) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        handleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ContextThemeProvider;
