import { useEffect, useState } from 'react';
import Button from './Button';

function Header() {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      throw new Error('you get error 💥');
    }
    [isError];
  });

  const handleError = () => {
    setIsError(!isError);
  };

  return (
    <header className="bg- flex w-full gap-6 bg-stone-800 p-6">
      <h1 className="text-3xl font-semibold uppercase text-red-600">
        Marvel comics
      </h1>
      <Button className="border border-white p-2" onClick={handleError}>
        error
      </Button>
    </header>
  );
}

export default Header;
