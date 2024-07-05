import { CardData } from '../../shared/types/card.types';
import Card from './Card';

type CardListProps = {
  cards: CardData[];
};

function CardList({ cards }: CardListProps) {
  return (
    <ul className="grid max-w-screen-2xl grid-cols-1 justify-center justify-items-center gap-5 py-10 lg:grid-cols-2 2xl:grid-cols-3">
      {cards.map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </ul>
  );
}

export default CardList;
