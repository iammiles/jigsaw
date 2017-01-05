export class Card {
  name: string;
  value: number;
  qty: number;
  description: string;

  constructor(name: string, value: number, qty: number, description: string) {
    this.name = name;
    this.value = value;
    this.qty = qty;
    this.description = description;
  }

  aboutCard(): string {
    return `The ${this.name} is worth ${this.value} points. A deck starts with ${this.qty} ${this.name} card(s) in the game.`
  }
  
  cardHelpMessage(): string {
    return `${this.aboutCard()}\n${this.description}`;
  }
}

export interface ICardTypes {
  name: string,
  qty: number,
  value: number,
  description: string,
  requiresDefender: boolean
}
export const typesOfCards: Array<ICardTypes> = [
  {
    name: "Guard",
    qty: 5,
    value: 1,
    description: 'Guess another player\'s non-Guard card and if you\'re right, they\'re out of the round!',
    requiresDefender: true,
  },
  {
    name: "Priest",
    qty: 2,
    value: 2,
    description: 'Play this card to look at another player\'s hand.',
    requiresDefender: true,
  },
  {
    name: "Baron",
    qty: 2,
    value: 3,
    description: 'Compare hands with another player. The player with the lower card is out.',
    requiresDefender: true,
  },
  {
    name: "Handmaid",
    qty: 2,
    value: 4,
    description: 'You are protected. No one can play a card against until after your next turn.',
    requiresDefender: false,
  },
  {
    name: "Prince",
    qty: 2,
    value: 5,
    description: 'Choose any player (including yourself) and they will have to drop their hand and draw a new card',
    requiresDefender: true,
  },
  {
    name: "King",
    qty: 1,
    value: 6,
    description: 'Choose another play to trade hands with.',
    requiresDefender: true,
  },
  {
    name: "Countess",
    qty: 1,
    value: 7,
    description: 'You must drop the countess if you have the Prince or King in your hand.',
    requiresDefender: false,
  },
  {
    name: "Princess",
    qty: 1,
    value: 8,
    description: 'If you drop this card you are out of the round.',
    requiresDefender: false,
  },
];