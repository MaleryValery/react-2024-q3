import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ironman } from '../../shared/config/msw/mocks/ironman';
import CardList from './CardList';

describe('CardList', () => {
  it('should render correct number of cards', () => {
    render(
      <MemoryRouter>
        <CardList data={ironman.data} />
      </MemoryRouter>
    );
    expect(
      screen.getAllByText(
        "Mock!!! Iron Man Modern Era Epic Collection: World's..."
      ).length
    ).toEqual(ironman.data.results.length);
  });
});
