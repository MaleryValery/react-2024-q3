import { ChangeEvent, Component, FormEvent } from 'react';
import Button from '../../shared/ui/Button';
import Form from '../../shared/ui/Form';
import SearchBar from '../../shared/ui/SearchBar';

type SearchFormState = {
  searchValue: string;
  onSubmit: (event: FormEvent<HTMLElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

class SearchForm extends Component<SearchFormState> {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit}>
        <SearchBar
          value={this.props.searchValue}
          onChange={this.props.onChange}
        />
        <Button type="submit">search</Button>
      </Form>
    );
  }
}

export default SearchForm;
