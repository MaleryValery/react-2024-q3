import img from '@/shared/assets/cover_image.jpg';
import { CardData } from '@/shared/types/card.types';
import getShortName from '@/shared/utils/getShortName';
import { MouseEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

type CardProps = {
  card: CardData;
};

function Card({ card }: CardProps) {
  const [searchParams] = useSearchParams();
  const image = card.thumbnail.path
    ? `${card.thumbnail.path}.${card.thumbnail.extension}`
    : img;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') {
      event.preventDefault();
    }
  };

  return (
    <li className="flex w-full">
      <Link
        data-testid="card"
        to={`/details/${card.id}?page=${searchParams.get('page') || 1}`}
        onClick={handleClick}
        className="flex w-full flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-red-400 sm:h-64 sm:flex-row dark:bg-gray-500"
      >
        <div className="flex-[2_1_0]">
          <img
            className="m-0 h-80 w-full object-cover object-center sm:h-full"
            src={image}
            alt={card.title}
          />
        </div>

        <div className="flex flex-[3_1_0] flex-col p-3">
          <div className="flex flex-[1_1_0] flex-col justify-start text-gray-800 dark:text-white">
            <h2 className="text-xl font-bold leading-[1.1]">
              {getShortName(card.title)}
            </h2>
            <div className="font-[16px] leading-normal text-gray-800 dark:text-white">
              {`pages - ${card.pageCount}`}
            </div>
          </div>
          <div className={`flex flex-[1_1_0] flex-col`}>
            <p className="text-gray-400">Series</p>
            <p className="capitalize text-zinc-600 dark:text-stone-100">
              {card.series?.name}
            </p>
          </div>
          <div className={`flex flex-[1_1_0] flex-col`}>
            <p className="text-gray-400">Creators</p>
            <p className="text-zinc-600 dark:text-stone-100">
              {card.creators?.items.length > 0 ? (
                <span>
                  {card.creators?.items[0].role} -{' '}
                  {card.creators?.items[0].name}
                </span>
              ) : (
                'Unknown'
              )}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Card;
