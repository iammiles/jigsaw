import { Card } from './Card';
import { shuffle } from './utilities';
import { typesOfCards } from './Card';

export class Deck {
  pile: Array<Card>
  constructor() {
    this.pile = Array<Card>();
    this.initDeck();
  }

  private initDeck(): void {
    typesOfCards.forEach(card => this.addCardToDeck(card.qty, new Card(card.name, card.value, card.qty, card.description)));
    this.pile = shuffle(this.pile);
    this.pile.splice(Math.random() * this.pile.length, 1);
  }

  private addCardToDeck(qty, card): void {
    if (qty > 0) {
      this.pile.push(card);
      return this.addCardToDeck(qty - 1, card);
    }
  }

  dealCard(): Card {
    return this.pile.shift();
  }

  whatIsDeck(): void {
    this.pile.forEach(card => console.log(card.name))
  }
}