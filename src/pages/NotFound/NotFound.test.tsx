import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('should render the not found message and image', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('Page is not found')).toBeInTheDocument();

    const image = screen.getByAltText('thanos hand');
    expect(image).toBeInTheDocument();

    const link = screen.getByText('Back to home page');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should navigate to the home page when the link is clicked', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const link = screen.getByText('Back to home page');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
