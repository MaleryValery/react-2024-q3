import { PARAMS, PUBLIC_API_KEY } from '../../config/config';
import { PAGINATION } from '../../consts/consts';

export const setQueryParams = (searchValue?: string, offset?: number) => {
  if (searchValue && offset) {
    return {
      offset: (offset - 1) * PAGINATION.limit || 0,
      limit: PAGINATION.limit,
      apikey: PUBLIC_API_KEY,
      titleStartsWith: searchValue,
      ...PARAMS,
    };
  }
  if (offset) {
    return {
      offset: (offset - 1) * PAGINATION.limit || 0,
      limit: PAGINATION.limit,
      apikey: PUBLIC_API_KEY,
      ...PARAMS,
    };
  }
  return {
    apikey: PUBLIC_API_KEY,
    ...PARAMS,
  };
};
