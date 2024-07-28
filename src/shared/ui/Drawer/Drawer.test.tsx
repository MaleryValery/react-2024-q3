import { setSelectedCards } from '@/app/redux/cardsSlice';
import store from '@/app/redux/store';
import { ironman } from '@/shared/config/msw/mocks/ironman';
import { downloadFile } from '@/shared/utils/downloadFile/downloadFile';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Drawer from './Drawer';

vi.mock('@/shared/utils/downloadFile', () => ({
  downloadFile: vi.fn(),
  generateCSV: vi.fn(),
}));

describe('Drawer component', () => {
  const mockCard = {
    ...ironman.data.results[0],
  };

  const mockSelectedCards = {
    card1: { ...ironman.data.results[0] },
  };

  beforeEach(() => {
    store.dispatch(setSelectedCards(mockCard));
  });

  it('renders correctly with the number of selected cards', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    expect(screen.getByText('1 cards selected in Drawer')).toBeInTheDocument();
  });

  it.skip('calls downloadFile with correct arguments when Download button is clicked', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(downloadFile).toHaveBeenCalledWith(
      mockSelectedCards,
      `${Object.keys(mockSelectedCards).length}_cards`
    );
  });

  it('dispatches resetSelectedCards action when Unselect all button is clicked', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(store.getState().cards.selectedCards).toEqual({});
  });

  it('displays "0 cards selected in Drawer" after unselecting all cards', () => {
    render(
      <Provider store={store}>
        <Drawer />
      </Provider>
    );

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(screen.getByText('0 cards selected in Drawer')).toBeInTheDocument();
  });
});
