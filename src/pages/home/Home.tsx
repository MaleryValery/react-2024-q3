import { ChangeEvent, Component, FormEvent } from 'react';
import { getAllComics } from '../../service/apiService';
import { SERCH_KEY } from '../../shared/consts/consts';
import { CardData } from '../../shared/types/card.types';
import Loader from '../../shared/ui/Loader';
import CardList from '../cards/CardList';
import SearchForm from '../cards/SearchForm';

type HomeState = {
  cards: CardData[];
  searchValue: string;
  isLoading: boolean;
};

class Home extends Component<object, HomeState> {
  constructor(props: object) {
    super(props);

    this.state = {
      isLoading: false,
      cards: [],
      searchValue: localStorage.getItem(SERCH_KEY.searchValue) || '',
    };

    this.handlerFetchSearch = this.handlerFetchSearch.bind(this);
  }

  componentDidMount() {
    this.handlerFetchSearch();
  }

  handlerFetchSearch = async () => {
    try {
      this.setState({ isLoading: true });
      const data = await getAllComics(this.state.searchValue);
      if (data) {
        this.setState({
          cards: data.results,
        });
      }
    } catch (error) {
      throw new Error('Somethimg went wrong');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlerQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: event.target.value });

    localStorage.setItem(SERCH_KEY.searchValue, event.target.value || '');
  };

  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    this.handlerFetchSearch();
  };

  render() {
    return (
      <>
        <SearchForm
          onSubmit={this.onSubmit}
          searchValue={this.state.searchValue}
          onChange={this.handlerQueryChange}
        />

        {this.state.isLoading && <Loader />}
        {this.state?.cards && !!this.state?.cards.length && (
          <CardList cards={this.state.cards} />
        )}
      </>
    );
  }
}

export default Home;
