import { PARAMS, PUBLIC_API_KEY } from '@/shared/config/config';
import { PAGINATION } from '@/shared/consts/consts';
import { describe, expect, it } from 'vitest';
import { setQueryParams } from './setQueryParams';

describe('setQueryParams', () => {
  it('returns correct params when both searchValue and offset are provided', () => {
    const searchValue = 'Spiderman';
    const offset = 2;
    const result = setQueryParams(searchValue, offset);

    expect(result).toEqual({
      offset: (offset - 1) * PAGINATION.limit,
      limit: PAGINATION.limit,
      apikey: PUBLIC_API_KEY,
      titleStartsWith: searchValue,
      ...PARAMS,
    });
  });

  it('returns correct params when only offset is provided', () => {
    const offset = 2;
    const result = setQueryParams(undefined, offset);

    expect(result).toEqual({
      offset: (offset - 1) * PAGINATION.limit,
      limit: PAGINATION.limit,
      apikey: PUBLIC_API_KEY,
      ...PARAMS,
    });
  });

  it('returns correct params when neither searchValue nor offset are provided', () => {
    const result = setQueryParams();

    expect(result).toEqual({
      apikey: PUBLIC_API_KEY,
      ...PARAMS,
    });
  });

  it('returns correct params when searchValue is provided without offset', () => {
    const searchValue = 'Spiderman';
    const result = setQueryParams(searchValue);

    expect(result).toEqual({
      apikey: PUBLIC_API_KEY,
      ...PARAMS,
    });
  });

  it('returns correct params when offset is 1', () => {
    const offset = 1;
    const result = setQueryParams(undefined, offset);

    expect(result).toEqual({
      offset: 0,
      limit: PAGINATION.limit,
      apikey: PUBLIC_API_KEY,
      ...PARAMS,
    });
  });
});
