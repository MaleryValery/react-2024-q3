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

  if (!data && !isLoading) {
    return <p>Nothing was found</p>;
  }

  if (error) {
    return <ErrorElement />;
  }

  return (
    <div className="flex flex-col items-center gap-10 p-10" data-testid="home">
      <SearchForm />
      {data && <CardList data={data.data} />}
    </div>
  );
}

export default Home;
