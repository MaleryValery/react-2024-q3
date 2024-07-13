import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from './Form';

describe('Form', () => {
  it('should render form element', () => {
    render(<Form />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });
});
