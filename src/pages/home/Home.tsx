import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { BASE_URL } from '../../shared/config/config';
import { SERCH_KEY } from '../../shared/consts/consts';
import useFetch from '../../shared/hooks/useFetch';
import useStorage from '../../shared/hooks/useStorage';
import ErrorElement from '../../shared/ui/ErrorElement';
import Loader from '../../shared/ui/Loader';
import CardList from '../cards/CardList';
import SearchForm from '../cards/SearchForm';

const Home = memo(() => {
  const { setStorage, getStorage, storageValue } = useStorage(
    SERCH_KEY.searchValue
  );
  const [searchValue, setSearchValue] = useState(getStorage());
  const { data, isLoading, error, setSearch } = useFetch(
    BASE_URL,
    storageValue
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
  };

  return (
    <div className="flex flex-col items-center gap-10 p-10">
      <SearchForm
        onSubmit={onSubmit}
        searchValue={searchValue}
        onChange={handlerQueryChange}
      />

      {isLoading && <Loader />}
      {data?.results && !!data.results.length && (
        <CardList cards={data?.results} />
      )}
      {!data?.results.length && !isLoading && <p>Nothing was found</p>}
      {error && <ErrorElement />}
    </div>
  );
});

export default Home;
