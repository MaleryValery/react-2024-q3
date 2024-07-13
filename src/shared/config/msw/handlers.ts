import { delay, http, HttpResponse } from 'msw';
import { ironman } from './mocks/ironman';
import { notFound } from './mocks/notFound';

export const handlers = [
  http.get('*/comics', async ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('titleStartsWith');

    await delay();

    if (query === 'iron') {
      return HttpResponse.json(ironman);
    }
    return HttpResponse.json(notFound);
  }),
];
('https://gateway.marvel.com/v1/public/comics?offset=0&limit=5&apikey=256cd39026dc5d7221504e9489323d09&titleStartsWith=iron&ts=1720874675803&hash=31d6a8bc487645f1a7aef10c2e8bbb24');
