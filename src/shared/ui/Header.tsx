import { Component } from 'react';
import Button from './Button';

class Header extends Component {
  state = {
    isError: false,
  };

  componentDidUpdate() {
    const { isError } = this.state;
    if (isError) {
      throw new Error('you get error 💥');
    }
  }

  private handleError = () => {
    this.setState({ isError: true });
  };

  render() {
    return (
      <header className="bg- flex w-full bg-stone-800 p-6">
        <h1 className="text-3xl font-semibold uppercase text-red-600">
          Marvel comics
        </h1>
        <Button onClick={this.handleError}>error</Button>
      </header>
    );
  }
}

export default Header;
