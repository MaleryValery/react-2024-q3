import { getComicsById } from '@/service/apiService';
import { ironman } from '@/shared/config/msw/mocks/ironman';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import CardDetails from './CardDetails';
vi.mock('@/service/apiService');

const mockCardData = ironman.data.results[0];

describe('CardDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (getComicsById as Mock).mockResolvedValue({ results: [mockCardData] });
  });

  it('should display a loading indicator while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/details/111670']}>
        <Routes>
          <Route path="/details/:id" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
  });

  it('should display the detailed card data correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/details/111670']}>
        <Routes>
          <Route path="/details/:id" element={<CardDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(
          "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Collects Invincible Iron Man (2008) #1-19. The Armored Avenger faces his worst nightmares! Tony Stark - billionaire industrialist, Invincible Iron Man and now director of S.H.I.E.L.D. - faces the most overwhelming challenge of his life. Ezekiel Stane - the son of Tony's late business rival and archenemy Obadiah Stane - has set his sights, his genius and his considerable fortune on the task of destroying the Stark legacy. What's worse, Ezekiel has obtained Iron Man technology, and he's every bit Tony's equal - except younger, faster, smarter…and immeasurably evil! Then, following the Skrulls' Secret Invasion, Tony's entire life has been torn apart. What could make Iron Man the world's most wanted? Tony's failing health has made the armor too complicated to pilot, and he has Maria Hill on his tail - not to mention his entire rogues' gallery is after the billion-dollar bounty on his head! And things only get worse from there!"
        )
      ).toBeInTheDocument();
      expect(screen.getByText('Pages: 496')).toBeInTheDocument();
      expect(
        screen.getByText(
          "Series: IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (2024)"
        )
      ).toBeInTheDocument();
    });
  });

  it('should hide the component when the close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/details/111670']}>
        <Routes>
          <Route path="/details/:id" element={<CardDetails />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback)"
        )
      ).toBeInTheDocument();
    });

    const closeButton = screen.getByText('❌');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Card')).not.toBeInTheDocument();
      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });
  });
});
