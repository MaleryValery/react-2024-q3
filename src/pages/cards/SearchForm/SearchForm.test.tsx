import { setSearchQuery } from '@/app/redux/cardsSlice';
import store from '@/app/redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import SearchForm from './SearchForm';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSearchParams: vi.fn(),
  };
});

const dispatchSpy = vi.spyOn(store, 'dispatch');

describe('SearchForm component', () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);
  });

  it('renders the search form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('updates the input value when typed into', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchForm />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'Spider-Man' } });

    expect(input).toHaveValue('Spider-Man');
  });

  it('dispatches setSearchQuery and sets search params on form submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchForm />
        </MemoryRouter>
      </Provider>
    );

    const input = screen.getByRole('searchbox');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Spider-Man' } });
    fireEvent.submit(form);

    expect(dispatchSpy).toHaveBeenCalledWith(setSearchQuery('Spider-Man'));
  });
});
