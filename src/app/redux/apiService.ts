import { BASE_URL } from '@/shared/config/config';
import { ENDPOINT } from '@/shared/consts/consts';
import { ResponseData } from '@/shared/types/response.type';
import { setQueryParams } from '@/shared/utils/setQueryParams/setQueryParams';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type SearchParams = {
  searchValue?: string;
  offset?: number;
};

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comics'],
  endpoints: (builder) => ({
    getComicsList: builder.query<ResponseData, SearchParams>({
      query: ({ searchValue, offset }) => ({
        url: ENDPOINT.comics,
        params: setQueryParams(searchValue, offset),
        headets: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['Comics'],
    }),
    getComicsById: builder.query<ResponseData, number>({
      query: (id: number) => ({
        url: `${ENDPOINT.comics}/${id}`,
        params: setQueryParams(),
      }),
      providesTags: ['Comics'],
    }),
  }),
});
