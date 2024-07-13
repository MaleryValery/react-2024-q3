import { ironman } from '@/shared/config/msw/mocks/ironman';
import { CardData } from '@/shared/types/card.types';
import getShortName from '@/shared/utils/getShortName';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Card from './Card';

const mockCardData: CardData = ironman.data.results[0];

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the card component with relevant data', () => {
    render(
      <MemoryRouter>
        <Card card={mockCardData} />
      </MemoryRouter>
    );

    expect(
      screen.getByAltText(
        "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        getShortName(
          "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
        )
      )
    ).toBeInTheDocument();
    expect(screen.getByText('pages - 496')).toBeInTheDocument();
    expect(screen.getByText('Series')).toBeInTheDocument();
    expect(
      screen.getByText(
        "IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (2024)"
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Creators')).toBeInTheDocument();
    expect(screen.getByText('letterer - Vc Joe Caramagna')).toBeInTheDocument();
  });

  it('should open a detailed card component when clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card card={mockCardData} />} />
          <Route path="/details/:id" element={<div>Details Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByTestId('card');
    fireEvent.click(link);

    expect(screen.getByText('Details Page')).toBeInTheDocument();
  });

  it('should prevent default behavior when location pathname is not "/"', () => {
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/details',
      },
    });

    render(
      <MemoryRouter>
        <Card card={mockCardData} />
      </MemoryRouter>
    );

    const link = screen.getByTestId('card');
    fireEvent.click(link);

    expect(window.location.pathname).toContain('/details');
  });
});
