import { setSelectedCards } from '@/app/redux/cardsSlice';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import img from '@/shared/assets/cover_image.jpg';
import { CardData } from '@/shared/types/card.types';
import Button from '@/shared/ui/Button/Button';
import getShortName from '@/shared/utils/getShortName/getShortName';
import { MouseEvent } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';

type CardProps = {
  card: CardData;
};

function Card({ card }: CardProps) {
  const [searchParams] = useSearchParams();
  const image = card.thumbnail.path
    ? `${card.thumbnail.path}.${card.thumbnail.extension}`
    : img;

  const selectedCards = useAppSelector((state) => state.cards.selectedCards);
  const dispatch = useAppDispatch();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname !== '/') {
      event.preventDefault();
    }
  };

  const handlerSelectCard = () => {
    dispatch(setSelectedCards(card));
  };

  return (
    <li className="relative flex w-full rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <Button
        className="absolute left-3 top-3 rounded-full bg-red-600 p-2"
        onClick={handlerSelectCard}
      >
        {selectedCards[card.id] ? (
          <FaStar size={26} className="text-amber-500" />
        ) : (
          <FaRegStar size={26} className="text-amber-500" />
        )}
      </Button>
      <Link
        data-testid="card"
        to={`/details/${card.id}?page=${searchParams.get('page') || 1}`}
        onClick={handleClick}
        className="flex w-full flex-col overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:h-64 sm:flex-row dark:bg-slate-700"
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
              {getShortName(card.title) || 'Unknown'}
            </h2>
            <div className="font-[16px] leading-normal text-gray-800 dark:text-white">
              {`pages - ${card.pageCount || 'Unknown'}`}
            </div>
          </div>
          <div className={`flex flex-[1_1_0] flex-col`}>
            <p className="text-gray-400">Series</p>
            <p className="capitalize text-zinc-600 dark:text-stone-100">
              {card.series?.name || 'Unknown'}
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
