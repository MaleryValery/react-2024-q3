import { CardData } from './card.types';

export type ResponseData = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: MetaData;
  next?: string | null;
  previous?: string | null;
};

export type MetaData = {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CardData[];
};
