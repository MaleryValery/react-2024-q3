import store from '@/app/redux/store';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';

const Wrapper = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
};

describe('Home', () => {
  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    cleanup();
  });

  it.skip('should render the Home component', () => {
    render(<Wrapper />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });
});
