import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render the SearchBar component', () => {
    render(<SearchBar value="" />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });
});
