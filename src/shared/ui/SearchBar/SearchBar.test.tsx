import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from './SearchBar';

const mock = vi.fn();
describe('SearchBar', () => {
  it('should render the SearchBar component', () => {
    render(<SearchBar value="value" onChange={mock} />);
    const searchBar = screen.getByRole('searchbox');
    expect(searchBar).toBeInTheDocument();
  });
});
