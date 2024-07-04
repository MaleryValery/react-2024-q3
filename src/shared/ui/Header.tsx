import { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="bg- flex w-full bg-stone-800 p-6">
        <h1 className="text-3xl font-semibold uppercase text-red-600">
          Marvel comics
        </h1>
      </header>
    );
  }
}

export default Header;
