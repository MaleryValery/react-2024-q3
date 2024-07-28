import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeContext } from './ContextTheme';
import { default as ContextThemeProvider } from './ContextThemeProvider';

const ThemeConsumer = () => {
  const { isDark, handleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-value">{isDark ? 'dark' : 'light'}</span>
      <button data-testid="toggle-theme" onClick={handleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ContextThemeProvider', () => {
  it('toggles theme correctly', () => {
    render(
      <ContextThemeProvider>
        <ThemeConsumer />
      </ContextThemeProvider>
    );

    const themeValue = screen.getByTestId('theme-value');
    const toggleButton = screen.getByTestId('toggle-theme');

    expect(themeValue).toHaveTextContent('light');

    fireEvent.click(toggleButton);
    expect(themeValue).toHaveTextContent('dark');

    fireEvent.click(toggleButton);
    expect(themeValue).toHaveTextContent('light');
  });
});
