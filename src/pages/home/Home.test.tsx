import { cleanup, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Home from './Home';

const Wrapper = () => {
  return (
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
};

describe('Home', () => {
  afterEach(() => {
    localStorage.clear();
    vi.resetAllMocks();
    cleanup();
  });

  it('should render the Home component', () => {
    render(<Wrapper />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });

  it('should find Ironman', async () => {
    render(<Wrapper />);

    const user = ue.setup();
    const input = screen.getByRole('searchbox');
    const button = screen.getByText(/search/i);

    expect(input).toBeInTheDocument();

    await user.type(input, 'iron');
    await user.click(button);

    const title = await screen.findByAltText(
      "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
    );
    expect(title).toBeInTheDocument();
  });

  it('should not find apapapa', async () => {
    render(<Wrapper />);

    const user = ue.setup();
    const input = screen.getByRole('searchbox');
    const button = screen.getByText(/search/i);

    expect(input).toBeInTheDocument();

    await user.type(input, 'apapapa');
    await user.click(button);

    const notFound = await screen.findByText('Nothing was found');
    expect(notFound).toBeInTheDocument();
  });
});
