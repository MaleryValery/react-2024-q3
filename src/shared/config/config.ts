import { md5 } from 'js-md5';

export const PUBLIC_API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;
export const PRIVATE_API_KEY = import.meta.env.VITE_PRIVATE_API_KEY;

export const BASE_URL = 'https://gateway.marvel.com/v1/public/comics';

export const TS = Date.now();
export const HASH = md5(`${TS}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`);

export const PARAMS = {
  ts: TS,
  hash: HASH,
};
