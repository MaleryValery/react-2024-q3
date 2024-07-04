import { ChangeEvent, Component } from 'react';

type SearchBarProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

class SearchBar extends Component<SearchBarProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={(e) => this.props.onChange(e)}
        className="shadow-xs min-w-110 block w-full max-w-xs rounded-full border-2 border-black bg-transparent px-4 py-2 text-sm font-normal leading-relaxed text-gray-900 placeholder-gray-400 focus:outline-none"
      />
    );
  }
}

export default SearchBar;
