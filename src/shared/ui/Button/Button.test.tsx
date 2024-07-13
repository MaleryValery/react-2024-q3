import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('should render the Button component', () => {
    render(<Button />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
