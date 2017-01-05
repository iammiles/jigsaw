import { Hand } from './Hand';
import { Card } from './Card';

export class Player {
  name: string;
  id: string;
  isProtected: boolean;
  isOut: boolean;
  hand: Array<Card>;
  cardsPlayed: Array<Card>;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.isProtected = false;
    this.isOut = false;
    this.hand = [];
  }

  highestValueCard(): Card {
    return this.hand[0];
  }
}