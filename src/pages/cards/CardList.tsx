import { Component } from 'react';
import { CardData } from '../../shared/types/card.types';
import Card from './Card';

type CardListProps = {
  cards: CardData[];
};

class CardList extends Component<CardListProps> {
  render() {
    const { cards } = this.props;
    return (
      <ul>
        {cards.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      </ul>
    );
  }
}

export default CardList;
