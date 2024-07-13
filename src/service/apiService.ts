import axios from 'axios';
import { BASE_URL, PARAMS, PUBLIC_API_KEY } from '../shared/config/config';
import { ResponseData } from '../shared/types/response.type';

const setQueryParams = (searchValue?: string) => {
  if (searchValue) {
    return {
      apikey: PUBLIC_API_KEY,
      titleStartsWith: searchValue,
      ...PARAMS,
    };
  }
  return {
    apikey: PUBLIC_API_KEY,
    ...PARAMS,
  };
};

export const getAllComics = async (searchValue?: string) => {
  if (searchValue && searchValue?.length < 3) return;
  try {
    const response = await axios.get<ResponseData>(`${BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: setQueryParams(searchValue),
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getComicsById = async (id: string) => {
  try {
    const response = await axios.get<ResponseData>(`${BASE_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: setQueryParams(),
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
