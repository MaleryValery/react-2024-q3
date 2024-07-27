import { CardData } from '@/shared/types/card.types';
import { MetaData } from '@/shared/types/response.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import apiService from './apiService';

type CardsState = {
  cards: MetaData | null;
  currentCard: CardData | null;
  selectedCards: Record<string, CardData>;
};

const initialState: CardsState = {
  cards: null,
  currentCard: null,
  selectedCards: {},
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<MetaData>) => {
      state.cards = action.payload;
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
  extraReducers: (builder) => {
    builder
      .addMatcher(
        apiService.endpoints.getComicsList.matchFulfilled,
        (state, action) => {
          state.cards = action.payload.data;
        }
      )
      .addMatcher(
        apiService.endpoints.getComicsById.matchFulfilled,
        (state, action) => {
          state.currentCard = action.payload.data.results[0];
        }
      );
  },
});

export const {
  setCards,
  setCurrentCard,
  setSelectedCards,
  resetSelectedCards,
} = cardsSlice.actions;
