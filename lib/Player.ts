import { Hand } from './Hand';
import { Card } from './Card';

export class Player {
  name: string;
  id: string;
  isProtected: boolean;
  isOut: boolean;
  hand: Array<Card>;
  cardsPlayed: Array<Card>;
  isTurn: boolean;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
    this.isProtected = false;
    this.isTurn = false;
    this.isOut = false;
    this.hand = [];
  }

  highestValueCard(): Card {
    return this.hand[0];
  }

  getReadablePlayerHand(): string {
    return `You have: ${this.hand.map(card => card.name)}`;
  }

  getPlayerCard(): Card {
    return this.hand[0];
  }

  removeCard(cardName: string): void {
    this.hand = this.hand.filter(card => card.name.toUpperCase() !== cardName.toUpperCase())
  }

  isValidCard(str: string): boolean {
    return this.hand.some(card => card.name.toUpperCase() === str.toUpperCase());
  }
}