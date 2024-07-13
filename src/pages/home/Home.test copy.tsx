import { cleanup, render, screen } from '@testing-library/react';
import ue from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

const submitSpy = vi.fn();

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
    cleanup();
  });

  it('It should render the Home component', () => {
    render(<Wrapper />);
    const home = screen.getByTestId('home');
    expect(home).toBeInTheDocument();
  });

  it('it should find Ironman', async () => {
    render(<Wrapper />);

    const user = ue.setup();
    const form = screen.getByRole('form');
    const button = screen.getByText(/search/i);

    expect(form).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(form, 'Ironman');
    await user.click(button);

    expect(submitSpy).toHaveBeenCalledWith('Ironman');

    const img = screen.getByAltText(
      "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
    );
    expect(img).toBeInTheDocument();
  });

  it('it should not find apapapa', async () => {
    render(<Wrapper />);

    const user = ue.setup();
    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
    expect(submitSpy).not.toHaveBeenCalled();

    await user.type(form, 'Ironman');
    await user.click(screen.getByRole('button'));

    expect(submitSpy).toHaveBeenCalledWith('apapapa');

    const notFound = await screen.findByText('Nothing was found');
    expect(notFound).toBeInTheDocument();
  });
});
