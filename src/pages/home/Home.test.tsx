import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useFetch from '../../shared/hooks/useFetch';
import useStorage from '../../shared/hooks/useStorage';
import Home from './Home';

// Mock hooks
vi.mock('../../shared/hooks/useFetch');
vi.mock('../../shared/hooks/useStorage');

type MockData = {
  data: {
    results: { id: number; name: string }[];
  };
};

type MockFetch = {
  data: MockData | null;
  isLoading: boolean;
  error: string | null;
  setSearch: (value: string) => void;
};

type MockStorage = {
  setStorage: (value: string) => void;
  getStorage: () => string;
};

type MockProps = {
  data: MockData;
};

type MockSearchProps = {
  onSubmit: () => void;
  searchValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
// Mock child components
vi.mock('../cards/SearchForm', () => ({
  __esModule: true,
  default: (props: MockSearchProps) => (
    <div>
      <input
        type="search"
        onChange={props.onChange}
        value={props.searchValue}
      />
      <button onClick={props.onSubmit}>search</button>
    </div>
  ),
}));
vi.mock('../../shared/ui/Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));
vi.mock('../../shared/ui/ErrorElement', () => ({
  __esModule: true,
  default: () => <div>Error</div>,
}));
vi.mock('../cards/CardList', () => ({
  __esModule: true,
  default: ({ data }: MockData) => (
    <div>
      {data.results.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  ),
}));
vi.mock('../../shared/ui/Pagination', () => ({
  __esModule: true,
  default: () => <div>Pagination</div>,
}));

describe('Home Component', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('should render the Home component', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      setSearch: vi.fn(),
    });
    useStorage.mockReturnValue({
      setStorage: vi.fn(),
      getStorage: () => '',
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('should display loader when data is loading', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      setSearch: vi.fn(),
    });
    useStorage.mockReturnValue({
      setStorage: vi.fn(),
      getStorage: () => '',
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display error when there is an error', () => {
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Error message',
      setSearch: vi.fn(),
    });
    useStorage.mockReturnValue({
      setStorage: vi.fn(),
      getStorage: () => '',
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should display data when fetched', async () => {
    const mockData = { results: [{ id: 1, name: 'Test Card' }] };
    useFetch.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      setSearch: vi.fn(),
    });
    useStorage.mockReturnValue({
      setStorage: vi.fn(),
      getStorage: () => '',
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();
  });

  it('should call setSearch and setStorage on form submit', async () => {
    const setSearchMock = vi.fn();
    const setStorageMock = vi.fn();
    useFetch.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      setSearch: setSearchMock,
    });
    useStorage.mockReturnValue({
      setStorage: setStorageMock,
      getStorage: () => '',
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const searchBox = screen.getByRole('searchbox');
    const searchButton = screen.getByText(/search/i);

    fireEvent.change(searchBox, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(setSearchMock).toHaveBeenCalledWith('test');
      expect(setStorageMock).toHaveBeenCalledWith('test');
    });
  });
});
