import { md5 } from 'js-md5';

export const PUBLIC_API_KEY = '256cd39026dc5d7221504e9489323d09';
export const PRIVATE_API_KEY = 'd46d326ea5235db1895ffe3036da3b50c375c2b4';
// export const PUBLIC_API_KEY = '0854c7159e09b6a5c3c55442750deda8';
// export const PRIVATE_API_KEY = 'e3cd9f31c71fe296b83fb27bbf6c4f5dcb121398';

export const BASE_URL = 'http://gateway.marvel.com/v1/public/comics';

export const TS = Date.now();
export const HASH = md5(`${TS}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`);

export const PARAMS = {
  ts: TS,
  hash: HASH,
};
