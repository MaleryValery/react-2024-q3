import { Component } from 'react';

class ErrorElement extends Component {
  render() {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-20">
        <h1 className="skew-x-10 inline-block skew-y-1 transform text-2xl font-bold uppercase tracking-wider text-black">
          Wow, something went wrong...
        </h1>
        <div className="block h-44 w-44 bg-[url('./shared/assets/notfound.svg')] bg-cover bg-center bg-no-repeat" />
      </div>
    );
  }
}

export default ErrorElement;
