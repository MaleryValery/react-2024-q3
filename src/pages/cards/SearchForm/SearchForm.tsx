import Button from '@/shared/ui/Button/Button';
import Form from '@/shared/ui/Form/Form';
import SearchBar from '@/shared/ui/SearchBar/SearchBar';
import { ChangeEvent, FormEvent } from 'react';

type SearchFormState = {
  searchValue: string;
  onSubmit: (event: FormEvent<HTMLElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function SearchForm({ searchValue, onSubmit, onChange }: SearchFormState) {
  return (
    <Form
      onSubmit={onSubmit}
      className="flex min-w-64 gap-4 sm:min-w-96"
      data-testid="form-test"
    >
      <SearchBar value={searchValue} onChange={onChange} />
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
