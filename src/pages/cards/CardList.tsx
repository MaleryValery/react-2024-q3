import { MetaData } from '../../shared/types/response.type';

import Card from './Card';

type CardListProps = {
  data: MetaData;
};

function CardList({ data }: CardListProps) {
  return (
    <>
      <ul className="grid max-w-screen-2xl grid-cols-1 justify-center justify-items-center gap-5 py-10 lg:grid-cols-2 2xl:grid-cols-3">
        {data.results.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      </ul>
    </>
  );
}

export default CardList;
