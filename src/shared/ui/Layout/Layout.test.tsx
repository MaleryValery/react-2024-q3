// FILEPATH: /Users/lerka/Desktop/react-2024-q3/src/shared/ui/Layout/Layout.test.tsx

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from './Layout';

describe('Layout', () => {
  it('renders the Header component', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
});
