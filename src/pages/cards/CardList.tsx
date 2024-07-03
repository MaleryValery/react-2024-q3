import { Component } from 'react';
import { CardData } from '../../shared/types/card.types';

type CardListProps = {
  cards: CardData[];
};

class CardList extends Component<CardListProps> {
  render() {
    const { cards } = this.props;
    return (
      <ul>
        {cards.map((card) => {
          return <li key={card.id}>{card.id}</li>;
        })}
      </ul>
    );
  }
}

export default CardList;
