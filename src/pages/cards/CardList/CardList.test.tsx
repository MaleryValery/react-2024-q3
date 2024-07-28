import store from '@/app/redux/store';
import { mockCards } from '@/shared/config/msw/mocks/cards';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import CardList from './CardList';

describe('CardList', () => {
  it('should render correct number of cards', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList data={mockCards} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getAllByText(
        "Mock!!! Iron Man Modern Era Epic Collection: World's..."
      ).length
    ).toEqual(mockCards.results.length);
  });
});
