import store from '@/app/redux/store';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CardDetails from './CardDetails';

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display a loading indicator while fetching data', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/111670']}>
          <Routes>
            <Route path="/details/:id" element={<CardDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });
});
