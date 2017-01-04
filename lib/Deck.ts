import { Card } from './Card';
interface ICardTypes {
  name: string,
  qty: number,
  value: number,
  description: string
}
const typesOfCards: Array<ICardTypes> = [
    {
      name: "Guard",
      qty: 5,
      value: 1,
      description: 'Guess another player\'s non-Guard card and if you\'re right, they\'re out of the round!',
    },
    {
      name: "Priest",
      qty: 2,
      value: 2,
      description: 'Play this card to look at another player\'s hand.',
    },
    {
      name: "Baron",
      qty: 2,
      value: 3,
      description: 'Compare hands with another player. The player with the lower card is out.',
    },
    {
      name: "Handmaid",
      qty: 2,
      value: 4,
      description: 'You are protected. No one can play a card against until after your next turn.',
    },
    {
      name: "Prince",
      qty: 2,
      value: 5,
      description: 'Choose any player (including yourself) and they will have to drop their hand and draw a new card',
    },
    {
      name: "King",
      qty: 1,
      value: 6,
      description: 'Choose another play to trade hands with.',
    },
    {
      name: "Countess",
      qty: 1,
      value: 7,
      description: 'You must drop the countess if you have the Prince or King in your hand.',
    },
    {
      name: "Princess",
      qty: 1,
      value: 8,
      description: 'If you drop this card you are out of the round.',
    },

  ];
export class Deck {
  
  constructor() {

  }
  blah() {
    console.log(typesOfCards);
  }
}