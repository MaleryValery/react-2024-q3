export type CardData = {
  id: number;
  title: string;
  description?: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  digitalId?: number;
  variantDescription?: string;
  variants?: [];
  dates?: {
    type: string;
    date: string;
  }[];

  collections?: [];
  collectedIssues?: [];
  pageCount?: number;
  issueNumber?: number;
  textObjects?: string[];
  isbn?: string;
  type: string;
  ean?: string;
  issn?: string;
  format?: string;
  modified: string;
  prices?: Price[];
  thumbnail: PathImages;
  upc?: string;
  diamondCode?: string;
  images?: PathImages[];
  creators: Creators;
  characters: Characters;
  stories: Stories;
  series?: Item;
  comics: Comics;
  events: Events;
  next?: string;
  previous?: string;
};

type Url = {
  type: string;
  url: string;
};
type Price = {
  type: string;
  price: number;
};

type PathImages = {
  path: string;
  extension: string;
};

type Creators = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

type Item = {
  resourceURI: string;
  name: string;
  role?: string;
  type?: string;
};

type Characters = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

type Stories = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

type Comics = {
  available: number;
  collectionURI: string;
  items: Item[];
  returned: number;
};

type Events = {
  available: number;
  collectionURI: string;
  items?: Item[];
  returned: number;
};
