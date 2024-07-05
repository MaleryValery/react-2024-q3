import { InputHTMLAttributes } from 'react';

type SearchBarProps = {
  value: string;
} & InputHTMLAttributes<HTMLInputElement>;

function SearchBar({ value, ...rest }: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      {...rest}
      className="shadow-xs min-w-110 block w-full max-w-xs rounded-full border-2 border-black bg-transparent px-4 py-2 text-sm font-normal leading-relaxed text-gray-900 placeholder-gray-400 focus:outline-none"
    />
  );
}

export default SearchBar;
