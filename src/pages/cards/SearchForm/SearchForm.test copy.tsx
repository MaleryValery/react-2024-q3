import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('should render the SearchForm with a search bar and a button', () => {
    render(<SearchForm searchValue="" onSubmit={vi.fn()} onChange={vi.fn()} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('should call onChange when the search bar value changes', () => {
    const handleChange = vi.fn();
    render(
      <SearchForm searchValue="" onSubmit={vi.fn()} onChange={handleChange} />
    );

    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('');
  });

  it('should call onSubmit when the form is submitted', () => {
    const handleSubmit = vi.fn();
    render(
      <SearchForm searchValue="" onSubmit={handleSubmit} onChange={vi.fn()} />
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(expect.any(Object));
  });
});
