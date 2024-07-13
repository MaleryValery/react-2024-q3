import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useStorage from './useStorage';

describe('useStorage', () => {
  afterEach(() => {
    localStorage.clear();
    cleanup();
    vi.resetAllMocks();
  });

  it('should set and get the storage', () => {
    const { setStorage, getStorage } = useStorage('searchValue');
    setStorage('Ironman');
    expect(getStorage()).toBe('Ironman');
  });

  it('should return an empty string', () => {
    const { getStorage } = useStorage('searchValue');
    expect(getStorage()).toBe('');
  });
});
