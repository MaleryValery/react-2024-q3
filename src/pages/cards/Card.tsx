import { Component } from 'react';
import { CardData } from '../../shared/types/card.types';

class Card extends Component<CardData> {
  constructor(props: CardData) {
    super(props);
  }

  render() {
    const { id } = this.props;
    return <div>{id}</div>;
  }
}

export default Card;
