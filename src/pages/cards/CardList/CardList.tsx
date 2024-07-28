import { useLocation } from 'react-router-dom';

import { MetaData } from '@/shared/types/response.type';
import Pagination from '@/shared/ui/Pagination/Pagination';
import Card from '../Card/Card';

function CardList({ data }: { data: MetaData }) {
  const path = useLocation();

  const listStyle = path.pathname.includes('details')
    ? 'grid max-w-screen-2xl grid-cols-1 justify-center justify-items-center gap-5 py-10'
    : 'grid max-w-screen-2xl grid-cols-1 justify-center justify-items-center gap-5 py-10 lg:grid-cols-2 2xl:grid-cols-3';

  return (
    <>
      <ul className={`${listStyle}`}>
        {data.results.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      </ul>

      <Pagination data={data} />
    </>
  );
}

export default CardList;
