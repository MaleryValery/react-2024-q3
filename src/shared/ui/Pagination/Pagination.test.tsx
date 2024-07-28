import { setCards } from '@/app/redux/cardsSlice';
import store from '@/app/redux/store';
import { mockCards } from '@/shared/config/msw/mocks/cards';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Pagination from './Pagination';

// Mock useSearchParams
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSearchParams: vi.fn(),
  };
});

const mockSetSearchParams = vi.fn();

describe('Pagination component', () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([{}, mockSetSearchParams]);
    store.dispatch(setCards(mockCards));
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('first-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-button')).toBeInTheDocument();
  });

  it('disables first and prev buttons on the first page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('first-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();
  });

  it('enables next and last buttons on the first page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('next-button')).not.toBeDisabled();
    expect(screen.getByTestId('last-button')).not.toBeDisabled();
  });

  it('disables next and last buttons on the last page', () => {
    store.dispatch(setCards(mockCards));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    expect(screen.getByTestId('last-button')).toBeInTheDocument();
  });

  it('calls setSearchParams with correct page number when next button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('next-button'));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });
  });

  it('calls setSearchParams with correct page number when prev button is clicked', () => {
    store.dispatch(setCards(mockCards));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('prev-button'));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  it('calls setSearchParams with correct page number when a page button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('2'));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });
});
