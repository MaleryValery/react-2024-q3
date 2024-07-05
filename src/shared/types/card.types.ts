export type CardData = {
  id: number;
  title: string;
  description?: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  pageCount?: number;
  type: string;
  modified: string;
  thumbnail: PathImages;
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
  items?: Item;
  returned: number;
};
