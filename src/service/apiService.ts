import axios from 'axios';
import { BASE_URL, PARAMS, PUBLIC_API_KEY } from '../shared/config/config';
import { SERCH_KEY } from '../shared/consts/consts';
import { ResponseData } from '../shared/types/response.type';

export const getAllComics = async (searchValue?: string) => {
  if (searchValue && searchValue?.length < 3) return;
  try {
    const response = await axios.get<ResponseData>(`${BASE_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: PUBLIC_API_KEY,
        titleStartsWith: searchValue || SERCH_KEY.defaulSearchValue,
        ...PARAMS,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
