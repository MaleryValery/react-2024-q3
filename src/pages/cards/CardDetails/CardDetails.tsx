import { getComicsById } from '@/service/apiService';
import { CardData } from '@/shared/types/card.types';
import ErrorElement from '@/shared/ui/ErrorElement/ErrorElement';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import img from '@/shared/assets/cover_image.jpg';
import Loader from '@/shared/ui/Loader/Loader';

function CardDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [card, setCard] = useState<CardData | null>(null);
  const location = useLocation();

  const fetchCardDetails = useCallback(async () => {
    const searchId = id?.split('&')[0].split('=')[1] || '';
    try {
      setIsLoading(true);
      const data = await getComicsById(searchId || '');
      setCard(data?.results[0] || null);
    } catch (error) {
      setIsError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCardDetails();
  }, [fetchCardDetails]);

  if (!id) return <ErrorElement />;

  const image = card?.thumbnail.path
    ? `${card.thumbnail.path}.${card.thumbnail.extension}`
    : img;

  return (
    <div className="relative m-8 overflow-hidden rounded-3xl bg-black text-white">
      {!isLoading && isError && <ErrorElement />}
      {isLoading && !isError && <Loader />}
      {!isLoading && !isError && !!card && (
        <div className="flex flex-col items-center gap-4 p-8">
          <Link to={`/${location.search}`}>
            <div className="absolute right-4 top-4 rounded-full border-2 border-red-500 px-2 py-1 transition-all duration-300 hover:bg-white hover:text-black">
              ❌
            </div>
          </Link>
          <h2 className="pt-4 text-xl">{card.title || 'unknown'}</h2>
          <div className="w-1/3 rounded-lg bg-green-600 p-8">
            <img className="w-full" src={image} alt={card.title} />
          </div>
          <div className="flex flex-col gap-2 text-lg">
            <p>{card.description}</p>
            {card.pageCount && card.pageCount > 0 && (
              <p>Pages: {card.pageCount}</p>
            )}
            {card.series?.resourceURI && <p>Series: {card.series.name}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
