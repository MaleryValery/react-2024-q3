import ErrorElement from '@/shared/ui/ErrorElement/ErrorElement';
import { Link, useLocation, useParams } from 'react-router-dom';

import { apiService } from '@/app/redux/apiService';
import { setCurrentCard } from '@/app/redux/cardsSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import img from '@/shared/assets/cover_image.jpg';
import Loader from '@/shared/ui/Loader/Loader';

function CardDetails() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = apiService.useGetComicsByIdQuery(
    parseInt(id ?? '', 10)
  );

  const image = data?.data?.results[0]?.thumbnail.path
    ? `${data.data?.results[0].thumbnail.path}.${data.data?.results[0].thumbnail.extension}`
    : img;

  if (!isLoading && error) return <ErrorElement />;

  if (isLoading && !error) return <Loader />;

  return (
    <div className="relative m-8 overflow-hidden rounded-3xl bg-black text-white">
      {!isLoading && !error && !!data?.data?.results[0] && (
        <div className="flex flex-col items-center gap-4 p-8">
          <Link
            to={`/${location.search}`}
            onClick={() => dispatch(setCurrentCard(null))}
          >
            <div className="absolute right-4 top-4 rounded-full border-2 border-red-500 px-2 py-1 transition-all duration-300 hover:bg-white hover:text-black">
              ❌
            </div>
          </Link>
          <h2 className="pt-4 text-xl">
            {data.data?.results[0].title || 'Unknown'}
          </h2>
          <div className="w-1/3 rounded-lg bg-green-600 p-8">
            <img
              className="w-full"
              src={image}
              alt={data.data?.results[0].title}
            />
          </div>
          <div className="flex flex-col gap-2 text-lg">
            <p>{data.data?.results[0].description || 'Unknown'}</p>
            {data.data?.results[0].pageCount &&
              data.data?.results[0].pageCount > 0 && (
                <p>Pages: {data.data?.results[0].pageCount || 'Unknown'}</p>
              )}
            {data.data?.results[0].series?.resourceURI && (
              <p>Series: {data.data?.results[0].series.name || 'Unknown'}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardDetails;
