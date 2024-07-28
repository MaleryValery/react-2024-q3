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

  http.get(`*/:id`, async ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get('id');
    await delay();

    if (query === '111670') {
      return HttpResponse.json(ironman);
    }
    return HttpResponse.json(notFound);
  }),
];
