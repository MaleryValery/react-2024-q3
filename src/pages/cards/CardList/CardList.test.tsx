import { setCards } from '@/app/redux/cardsSlice';
import store from '@/app/redux/store';
import { ironman } from '@/shared/config/msw/mocks/ironman';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import CardList from './CardList';

describe('CardList', () => {
  const mockCard = ironman;

  beforeEach(() => {
    store.dispatch(setCards(mockCard.data));
  });
  it('should render correct number of cards', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getAllByText(
        "Mock!!! Iron Man Modern Era Epic Collection: World's..."
      ).length
    ).toEqual(ironman.data.results.length);
  });
});
