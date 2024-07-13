import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('should render the Loader component', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
