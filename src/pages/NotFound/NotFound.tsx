import { Link } from 'react-router-dom';

import image from '@/shared/assets/not-found.png';

function NotFound() {
  return (
    <div className="flex flex-col items-center gap-8 p-12">
      <h2 className="text-3xl">Page is not found</h2>
      <img
        className="w-18 block h-24 object-cover"
        src={image}
        alt="thanos hand"
      />
      <Link
        to="/"
        className="rounded-md border-2 border-black px-4 py-2 transition-all duration-300 hover:bg-black hover:text-white"
      >
        Back to home page
      </Link>
    </div>
  );
}

export default NotFound;
