import { apiService } from '@/app/redux/apiService';
import ErrorElement from '@/shared/ui/ErrorElement/ErrorElement';
import Loader from '@/shared/ui/Loader/Loader';
import { ChangeEvent, FormEvent, memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardList from '../cards/CardList/CardList';
import SearchForm from '../cards/SearchForm/SearchForm';

const Home = memo(function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, error, isFetching } =
    apiService.useGetComicsListQuery({
      searchValue,
      offset: parseInt(searchParams.get('page') || '1', 10) || 1,
    });

  const handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearchParams({ page: '1' });
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-10 p-10" data-testid="home">
      <SearchForm
        onSubmit={onSubmit}
        searchValue={searchValue}
        onChange={handlerQueryChange}
      />

      {data?.data?.results && !!data.data.results.length && <CardList />}
      {!data?.data?.results.length && !isLoading && <p>Nothing was found</p>}
      {error && <ErrorElement />}
    </div>
  );
});

export default Home;
