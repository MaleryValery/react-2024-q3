import { ChangeEvent, FormEvent } from 'react';
import Button from '../../shared/ui/Button';
import Form from '../../shared/ui/Form';
import SearchBar from '../../shared/ui/SearchBar';

type SearchFormState = {
  searchValue: string;
  onSubmit: (event: FormEvent<HTMLElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function SearchForm({ searchValue, onSubmit, onChange }: SearchFormState) {
  return (
    <Form onSubmit={onSubmit} className="flex min-w-64 gap-4 sm:min-w-96">
      <SearchBar value={searchValue} onChange={onChange} />
      <Button
        className="rounded-lg bg-black p-2 uppercase text-white"
        type="submit"
      >
        search
      </Button>
    </Form>
  );
}

export default SearchForm;
