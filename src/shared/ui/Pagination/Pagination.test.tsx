import { ironman } from '@/shared/config/msw/mocks/ironman';
import { MetaData } from '@/shared/types/response.type';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import Pagination from './Pagination';

const arr = Array.from({ length: 30 }).map(() => ironman.data.results[0]);

const mockData = {
  offset: 0,
  limit: 10,
  total: 30,
  count: 30,
  results: arr,
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const mockSetSearchParams = vi.fn();

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams('?page=1'),
      mockSetSearchParams,
    ]);
  });

  const renderPagination = (data: MetaData) => {
    render(
      <MemoryRouter>
        <Pagination data={data} />
      </MemoryRouter>
    );
  };

  it('should update URL query parameter when the next page button is clicked', () => {
    renderPagination(mockData);

    const nextPageButton = screen.getByTestId('next-button');
    fireEvent.click(nextPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });

  it('should update URL query parameter when the previous page button is clicked', () => {
    renderPagination({ ...mockData, offset: 10 });

    const prevPageButton = screen.getByTestId('prev-button');
    fireEvent.click(prevPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  it('should update URL query parameter when the first page button is clicked', () => {
    renderPagination({ ...mockData, offset: 10 });

    const firstPageButton = screen.getByTestId('first-button');
    fireEvent.click(firstPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '1' });
  });

  it('should update URL query parameter when the last page button is clicked', () => {
    renderPagination(mockData);

    const lastPageButton = screen.getByTestId('last-button');
    fireEvent.click(lastPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '3' });
  });

  it('should disable previous and first page buttons on the first page', () => {
    renderPagination(mockData);

    const firstPageButton = screen.getByTestId('first-button');
    const prevPageButton = screen.getByTestId('prev-button');

    expect(firstPageButton).toBeDisabled();
    expect(prevPageButton).toBeDisabled();
  });

  it('should disable next and last page buttons on the last page', () => {
    renderPagination({ ...mockData, offset: 20 });

    const nextPageButton = screen.getByTestId('next-button');
    const lastPageButton = screen.getByTestId('last-button');

    expect(nextPageButton).toBeDisabled();
    expect(lastPageButton).toBeDisabled();
  });

  it('should render the correct page numbers', () => {
    renderPagination(mockData);

    const pageNumberButtons = screen.getAllByRole('button', { name: /\d+/ });
    expect(pageNumberButtons).toHaveLength(3);
    pageNumberButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it('should call onChangePage with the correct page number when a page button is clicked', () => {
    renderPagination(mockData);

    const pageNumberButtons = screen.getAllByRole('button', { name: /\d+/ });
    fireEvent.click(pageNumberButtons[1]); // Click on page 2 button

    expect(mockSetSearchParams).toHaveBeenCalledWith({ page: '2' });
  });
});
