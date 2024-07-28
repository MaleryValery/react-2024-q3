import { CardData } from '@/shared/types/card.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CardsState = {
  currentCard: CardData | null;
  selectedCards: Record<string, CardData>;
  searchValue: string;
};

const initialState: CardsState = {
  currentCard: null,
  selectedCards: {},
  searchValue: '',
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCurrentCard: (state, action: PayloadAction<CardData | null>) => {
      state.currentCard = action.payload;
    },
    setSelectedCards: (state, action: PayloadAction<CardData>) => {
      const isCardSelected = state.selectedCards[action.payload.id];

      if (isCardSelected) {
        delete state.selectedCards[action.payload.id];
      } else {
        state.selectedCards[action.payload.id] = action.payload;
      }
    },
    resetSelectedCards: (state) => {
      state.selectedCards = {};
    },
  },
});

export const {
  setCurrentCard,
  setSelectedCards,
  resetSelectedCards,
  setSearchQuery,
} = cardsSlice.actions;

export default cardsSlice.reducer;
