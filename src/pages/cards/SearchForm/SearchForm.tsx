import { setSearchQuery } from '@/app/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import Button from '@/shared/ui/Button/Button';
import Form from '@/shared/ui/Form/Form';
import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchForm() {
  const [, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.cards.searchValue);

  const handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearchParams({ page: '1' });
    dispatch(setSearchQuery(searchValue));
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex min-w-64 gap-4 sm:min-w-96"
      data-testid="form-test"
    >
      <SearchBar
        value={searchValue || searchQuery}
        onChange={handlerQueryChange}
      />
      <Button
        className="rounded-lg bg-black p-2 uppercase text-white"
        type="submit"
        name="submit"
      >
        search
      </Button>
    </Form>
  );
}

export default SearchForm;
