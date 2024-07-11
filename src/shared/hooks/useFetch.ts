import axios from 'axios';
import { useEffect, useState } from 'react';
import { PARAMS, PUBLIC_API_KEY } from '../config/config';
import { MetaData, ResponseData } from '../types/response.type';

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

const useFetch = (url: string, searchValue?: string) => {
  const [data, setData] = useState<MetaData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [baseUrl, setBaseUrl] = useState(url);
  const [search, setSearch] = useState(searchValue || '');

  useEffect(() => {
    if (!baseUrl) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ResponseData>(baseUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: setQueryParams(search),
        });
        setData(response.data.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError(error.message);
        }
        setError('Something went wrong, cannot fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseUrl, search]);

  return { data, isLoading, error, setSearch, setBaseUrl };
};

export default useFetch;
