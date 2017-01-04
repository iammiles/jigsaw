import { Card } from './Card';

export class Player {
  name: string;
  isProtected: boolean;
  hand: Array<Card>;
  cardsPlayed: Array<Card>;
  constructor(name: string, isProtected: boolean, hand: Array<Card>) {
    this.name = name;
    this.isProtected = isProtected;
    this.hand = hand;
  }
}