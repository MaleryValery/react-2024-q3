import { ironman } from './ironman';

export const mockCards = {
  offset: 5,
  limit: 5,
  total: 61012,
  count: 5,
  results: [
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
    { ...ironman.data.results[0] },
  ],
};
