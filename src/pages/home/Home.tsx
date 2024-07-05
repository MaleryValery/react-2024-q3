import {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getAllComics } from '../../service/apiService';
import { SERCH_KEY } from '../../shared/consts/consts';
import { CardData } from '../../shared/types/card.types';
import Loader from '../../shared/ui/Loader';
import CardList from '../cards/CardList';
import SearchForm from '../cards/SearchForm';

const Home = memo(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem(SERCH_KEY.searchValue) || ''
  );

  const handlerFetchSearch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllComics(searchValue || '');
      if (data) {
        setCards(data.results);
      }
    } catch (error) {
      throw new Error('Somethimg went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [searchValue]);

  useEffect(() => {
    handlerFetchSearch();
  }, [handlerFetchSearch]);

  const handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    localStorage.setItem(SERCH_KEY.searchValue, event.target.value || '');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    handlerFetchSearch();
  };

  return (
    <div className="flex flex-col items-center gap-10 p-10">
      <SearchForm
        onSubmit={onSubmit}
        searchValue={searchValue}
        onChange={handlerQueryChange}
      />

      {isLoading && <Loader />}
      {cards && !!cards.length && <CardList cards={cards} />}
      {!cards.length && <p>Nothing was found</p>}
    </div>
  );
});

export default Home;
