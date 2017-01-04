class Card {
  name: string;
  value: number;
  qty: number;
  isProtected: boolean = false;
  constructor(name: string, value: number, qty: number) {
    this.name = name;
    this.value = value;
    this.qty = qty;
  }
  testProtection() {
    if (this.isProtected) {
      console.log(`${this.name} is currently protected`);
    } else {
      console.log('womp womp');
    }
  }
  genericMessage(card: Card) {
    return `The ${card.name} is worth ${card.value} points. A deck starts with ${card.qty} ${card.name} card(s) in the game.`
  }
  updateProtection() {
    this.isProtected = !this.isProtected;
  }
  rules() {
    console.log('to be implemented?');
  }
}

interface CardActions {
  help();
}

export class Guard extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Guard", 1, 5);
  }
  help() {
    const guardDescription: string = 'Guess another player\'s non-Guard card and if you\'re right, they\'re out of the round!';
    return `${super.genericMessage(this)}\n${guardDescription}`;
  }
}

export class Priest extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Priest", 2, 2);
  }
  help() {
    const priestDescription: string = 'Play this card to look at another player\'s hand.';
    return `${super.genericMessage(this)}\n${priestDescription}`;
  }
}

export class Baron extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Baron", 3, 2);
  }
  help() {
    const baronDescription: string = 'Compare hands with another player. The player with the lower card is out.';
    return `${super.genericMessage(this)}\n${baronDescription}`;
  }
}

export class Handmaid extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Handmaid", 4, 2);
  }
  help() {
    const handmaidDescription: string = 'You are protected. No one can play a card against until after your next turn.';
    return `${super.genericMessage(this)}\n${handmaidDescription}`;
  }
}

export class Prince extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Prince", 5, 2);
  }
  help() {
    const princeDescription: string = 'Choose any player (including yourself) and they will have to drop their hand and draw a new card';
    return `${super.genericMessage(this)}\n${princeDescription}`;
  }
}

export class King extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("King", 6, 1);
  }
  help() {
    const kingDescription: string = 'Choose another play to trade hands with.';
    return `${super.genericMessage(this)}\n${kingDescription}`;
  }
}

export class Countess extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Countess", 7, 1);
  }
  help() {
    const countessDescription: string = 'You must drop the countess if you have the Prince or King in your hand.';
    return `${super.genericMessage(this)}\n${countessDescription}`;
  }
}

export class Princess extends Card implements CardActions {
  constructor(name: string, value: number, qty: number) {
    super("Princess", 8, 1);
  }
  help() {
    const princessDescription: string = 'If you drop this card you are out of the round.';
    return `${super.genericMessage(this)}\n${princessDescription}`;
  }
}