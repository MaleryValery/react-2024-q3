import { ironman } from '@/shared/config/msw/mocks/ironman';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CardData } from '../../types/card.types';
import { downloadFile } from './downloadFile';

vi.mock('@/shared/utils/downloadFile', () => ({
  generateCSV: vi.fn(),
}));

describe('downloadFile', () => {
  const mockCardData: Record<string, CardData> = {
    card1: { ...ironman.data.results[0] },
    card2: { ...ironman.data.results[0] },
  };

  beforeEach(() => {
    global.URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');

    const mockLink = {
      href: '',
      download: '',
      click: vi.fn(),
    };
    vi.spyOn(document, 'createElement').mockReturnValue(
      mockLink as unknown as HTMLAnchorElement
    );
  });

  it('should create a CSV file and trigger a download', () => {
    downloadFile(mockCardData, 'test-file');

    expect(URL.createObjectURL).toHaveBeenCalled();

    const link = document.createElement('a') as HTMLAnchorElement;
    expect(link.href).toBe('mocked-url');
    expect(link.download).toBe('test-file.csv');
    expect(link.click).toHaveBeenCalled();
  });
});
