import { describe, expect, it } from 'vitest';
import getShortName from './getShortName';

describe('getShortName', () => {
  it('returns the formatted name if the length is less than 8 words', () => {
    const name = 'john doe';
    const result = getShortName(name);
    expect(result).toBe('John Doe');
  });

  it('returns the formatted name if the length is exactly 8 words', () => {
    const name = 'john doe smith brown jones williams taylor davis';
    const result = getShortName(name);
    expect(result).toBe('John Doe Smith Brown Jones Williams Taylor Davis...');
  });

  it('returns the shortened and formatted name if the length is more than 8 words', () => {
    const name = 'john doe smith brown jones williams taylor davis clark';
    const result = getShortName(name);
    expect(result).toBe('John Doe Smith Brown Jones Williams Taylor Davis...');
  });

  it('handles single-word names correctly', () => {
    const name = 'john';
    const result = getShortName(name);
    expect(result).toBe('John');
  });

  it('handles names with mixed casing correctly', () => {
    const name = 'jOhN DoE';
    const result = getShortName(name);
    expect(result).toBe('John Doe');
  });

  it('handles empty strings correctly', () => {
    const name = '';
    const result = getShortName(name);
    expect(result).toBe('');
  });
});
