import store from '@/app/redux/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Layout from './Layout';

describe('Layout', () => {
  it('renders the Header component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });
});
