import { Component } from 'react';
import { CardData } from '../../shared/types/card.types';
import getShortName from '../../shared/utils/getShortName';

type CardProps = {
  card: CardData;
};
class Card extends Component<CardProps> {
  render() {
    const { card } = this.props;
    console.log('🚀 ~ Card ~ render ~ card:', card);
    return (
      <div className="h-26 w-26 rounded-lg">
        <img
          src={`${card.images?.[0]?.path}.${card.images?.[0]?.extension}`}
          alt="hero"
          className="h-24 w-24 rounded-lg"
        />
        <div className="">
          <span data-testid="card-character-name" className="">
            {getShortName(card.title)}
          </span>
        </div>
      </div>
    );
  }
}

export default Card;
