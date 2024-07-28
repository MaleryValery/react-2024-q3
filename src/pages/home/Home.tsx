import { apiService } from '@/app/redux/apiService';
import { useAppSelector } from '@/app/redux/hooks';
import ErrorElement from '@/shared/ui/ErrorElement/ErrorElement';
import Loader from '@/shared/ui/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import CardList from '../cards/CardList/CardList';
import SearchForm from '../cards/SearchForm/SearchForm';

function Home() {
  const [searchParams] = useSearchParams();
  const { searchValue } = useAppSelector((state) => state.cards);

  const { data, isLoading, error, isFetching } =
    apiService.useGetComicsListQuery({
      searchValue,
      offset: parseInt(searchParams.get('page') || '1', 10) || 1,
    });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-10 p-10" data-testid="home">
      <SearchForm />

      {data?.data?.results && !!data.data.results.length && <CardList />}
      {!data?.data?.results.length && !isLoading && <p>Nothing was found</p>}
      {error && <ErrorElement />}
    </div>
  );
}

export default Home;
