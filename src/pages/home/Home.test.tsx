import { apiService } from '@/app/redux/apiService';
import store from '@/app/redux/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Home from './Home';

// vi.mock('@/app/redux/apiService', () => ({
//   apiService: {
//     useGetComicsListQuery: vi.fn(),
//   },
// }));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useSearchParams: vi.fn(),
  };
});

describe('Home component', () => {
  beforeEach(() => {
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams('page=1')]);
  });

  it.skip('renders Loader when data is loading', () => {
    (apiService.useGetComicsListQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      isFetching: true,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it.skip('renders ErrorElement when there is an error', () => {
    (apiService.useGetComicsListQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('error-element')).toBeInTheDocument();
  });

  it.skip('renders CardList when data is fetched', () => {
    const mockData = {
      data: {
        results: [{ id: 1, name: 'Comic 1' }],
      },
    };

    (apiService.useGetComicsListQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  it.skip('renders "Nothing was found" when no results are returned', () => {
    const mockData = {
      data: {
        results: [],
      },
    };

    (apiService.useGetComicsListQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isFetching: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing was found')).toBeInTheDocument();
  });
});
