import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getComicsById } from '../../service/apiService';
import { CardData } from '../../shared/types/card.types';
import ErrorElement from '../../shared/ui/ErrorElement';

import img from '../../shared/assets/cover_image.jpg';
import Loader from '../../shared/ui/Loader';

function CardDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [card, setCard] = useState<CardData | null>(null);

  const fetchCardDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getComicsById(id || '');
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
    <div className="m-8 h-full max-w-[50%] overflow-hidden rounded-3xl bg-black text-white">
      {!isLoading && isError && <ErrorElement />}
      {isLoading && !isError && <Loader />}
      {!isLoading && !isError && !!card && (
        <div className="flex flex-col items-center gap-4 p-8">
          <h2 className="text-xl">{card.title || 'unknown'}</h2>
          <div className="w-1/3 rounded-lg bg-green-600 p-8">
            <img className="w-full" src={image} alt={card.title} />
          </div>
          <div className="flex flex-col gap-2 text-3xl">
            <p>{card.description}</p>
            {card.pageCount && card.pageCount > 0 && (
              <p>Pages: {card.pageCount}</p>
            )}
            {card.series?.resourceURI && <p>Series: {card.series.name}</p>}
            <Link to="/">
              <div className="rounded-md border-2 border-red-500 px-4 py-2 text-center transition-all duration-300 hover:bg-red-500 hover:text-black">
                close
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
