import { ironman } from '@/shared/config/msw/mocks/ironman';
import { CardData } from '@/shared/types/card.types';
import { describe, expect, it } from 'vitest';
import { generateCSV } from './generateCSV';

const expectedCSV = `id,title,description,variantDescription
111670,MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback),Collects Invincible Iron Man (2008) #1-19. The Armored Avenger faces his worst nightmares! Tony Stark - billionaire industrialist, Invincible Iron Man and now director of S.H.I.E.L.D. - faces the most overwhelming challenge of his life. Ezekiel Stane - the son of Tony's late business rival and archenemy Obadiah Stane - has set his sights, his genius and his considerable fortune on the task of destroying the Stark legacy. What's worse, Ezekiel has obtained Iron Man technology, and he's every bit Tony's equal - except younger, faster, smarter…and immeasurably evil! Then, following the Skrulls' Secret Invasion, Tony's entire life has been torn apart. What could make Iron Man the world's most wanted? Tony's failing health has made the armor too complicated to pilot, and he has Maria Hill on his tail - not to mention his entire rogues' gallery is after the billion-dollar bounty on his head! And things only get worse from there!,
111670,MOCK!!! IRON MAN MODERN ERA EPIC COLLECTION: WORLD'S MOST WANTED TPB (Trade Paperback),Collects Invincible Iron Man (2008) #1-19. The Armored Avenger faces his worst nightmares! Tony Stark - billionaire industrialist, Invincible Iron Man and now director of S.H.I.E.L.D. - faces the most overwhelming challenge of his life. Ezekiel Stane - the son of Tony's late business rival and archenemy Obadiah Stane - has set his sights, his genius and his considerable fortune on the task of destroying the Stark legacy. What's worse, Ezekiel has obtained Iron Man technology, and he's every bit Tony's equal - except younger, faster, smarter…and immeasurably evil! Then, following the Skrulls' Secret Invasion, Tony's entire life has been torn apart. What could make Iron Man the world's most wanted? Tony's failing health has made the armor too complicated to pilot, and he has Maria Hill on his tail - not to mention his entire rogues' gallery is after the billion-dollar bounty on his head! And things only get worse from there!,`;

const mockCardData: Record<string, CardData> = {
  card1: { ...ironman.data.results[0] },
  card2: { ...ironman.data.results[0] },
};

describe('generateCSV', () => {
  it('should generate CSV string with headers', () => {
    const result = generateCSV(mockCardData);

    expect(result).toBe(expectedCSV);
  });

  it('should handle empty data', () => {
    const data: Record<string, CardData> = {};

    const expectedCSV = 'id,title,description,variantDescription\n';

    const result = generateCSV(data);

    expect(result).toBe(expectedCSV);
  });

  it('should handle missing optional fields', () => {
    const result = generateCSV(mockCardData);

    expect(result).toBe(expectedCSV);
  });
});
