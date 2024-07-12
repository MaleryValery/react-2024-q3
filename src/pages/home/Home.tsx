import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BASE_URL } from '../../shared/config/config';
import { SERCH_KEY } from '../../shared/consts/consts';
import useFetch from '../../shared/hooks/useFetch';
import useStorage from '../../shared/hooks/useStorage';
import ErrorElement from '../../shared/ui/ErrorElement';
import Loader from '../../shared/ui/Loader';
import Pagination from '../../shared/ui/Pagination';
import CardList from '../cards/CardList';
import SearchForm from '../cards/SearchForm';

const Home = memo(() => {
  const { setStorage, getStorage } = useStorage(SERCH_KEY.searchValue);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(getStorage());
  const { data, isLoading, error, setSearch } = useFetch(
    BASE_URL,
    searchValue,
    Number(searchParams.get('page')) || 1
  );

  const handlerFetchSearch = useCallback(() => {
    setSearch(searchValue);
  }, [searchValue, setSearch]);

  const handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handlerFetchSearch();
    setStorage(searchValue);
    setSearchParams({ page: '1' });
  };

  console.log('🚀 ~ Home ~ isLoading:', isLoading);
  return (
    <div className="flex flex-col items-center gap-10 p-10">
      <SearchForm
        onSubmit={onSubmit}
        searchValue={searchValue}
        onChange={handlerQueryChange}
      />

      {isLoading && <Loader />}
      {data?.results && !!data.results.length && (
        <>
          <CardList data={data} />
          <Pagination data={data} />
        </>
      )}
      {!data?.results.length && !isLoading && <p>Nothing was found</p>}
      {error && <ErrorElement />}
    </div>
  );
});

export default Home;
