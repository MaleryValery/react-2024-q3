import { Link } from 'react-router-dom';

function ErrorElement() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 p-20"
      data-testid="error-element"
    >
      <h1 className="skew-x-10 inline-block skew-y-1 transform text-2xl font-bold uppercase tracking-wider text-black">
        Wow, something went wrong...
      </h1>
      <div className="block h-44 w-44 bg-[url('./shared/assets/notfound.svg')] bg-cover bg-center bg-no-repeat" />
      <Link
        to="/"
        className="rounded-md border-2 border-black px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white"
      >
        Back to home page
      </Link>
    </div>
  );
}

export default ErrorElement;
