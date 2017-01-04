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
  aboutCard() {
    return `The ${this.name} is worth ${this.value} points. A deck starts with ${this.qty} ${this.name} card(s) in the game.`
  }
  cardHelpMessage(): string {
    return `${this.aboutCard()}\n${this.description}`;
  }
}