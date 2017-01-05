import { Deck } from './Deck';
import { Card } from './Card';
import { Player } from './Player';
import { shuffle } from './utilities';

export const enum GameStatus {
  PreGame,
  GameStart,
  GameEnd,
}

export class Game {
  deck: Deck;
  cardsPlayed: Array<Card>;
  players: Array<Player>;
  gameStatus: number;
  currentPlayer: Player;
  constructor() {
    this.gameStatus = GameStatus.PreGame;
    this.deck = new Deck();
    this.cardsPlayed = Array<Card>();
    this.players = Array<Player>();
  }

  addPlayer(p: Player): void {
    this.players.push(p);
  }

  removePlayer(p: Player): void {
    this.players.filter(player => player.name != p.name);
  }

  startGame(): void {
    this.gameStatus = GameStatus.GameStart;
    this.dealCardsToPlayers();
    this.players = shuffle(this.players)
    this.players[0].isTurn = true;
    this.dealCardToPlayer(this.players[0]);
  }

  newTurn(): void {
    if (this.players.length === 1) {
      this.gameOver();
      return;
    }
    const oldPlayer = this.players.shift();
    oldPlayer.isTurn = false;
    this.players[0].isTurn = true;
    console.log('current turn', this.players[0]);
    this.dealCardToPlayer(this.players[0])
    this.players.push(oldPlayer);
  }

  dealCardsToPlayers(): void {
    this.players.forEach(player => {
      player.hand.push(this.deck.dealCard());
    });
  }

  dealCardToPlayer(p: Player): void {
    if (this.deck.pile.length !== 0) {
      p.hand.push(this.deck.dealCard());
    } else {
      console.log('no more cards in deck');
      this.gameOver();
    }
  }

  // @TODO: deal with ties
  compareHands(): Player {
    return this.players.sort((a, b) => b.highestValueCard().value - a.highestValueCard().value).shift();
  }

  gameOver(): Player {
    this.endGame();
    if (this.players.length === 1) {
      return this.players[0];
    } else {
      return this.compareHands();
    }
  }

  endGame(): void {
    this.gameStatus = GameStatus.GameEnd;
  }

  parsePlay(attacker: Player, cmd: Array<string>): [boolean, string, Player] {
    //@todo check if it's actually attacker's turn && make this work
    if (this.gameStatus !== GameStatus.GameStart) return [true, 'Game has not started yet!', attacker];
    let [, cardName, defenderId, guess] = cmd;
    let msg: string = '';
     // Validate cardName
    console.log('attacker at parse play', attacker);
    console.log('card valid', attacker.isValidCard(cardName));
    if (!Boolean(cardName.trim()) || !attacker.isValidCard(cardName)) return [true, 'You picked an invalid card!', attacker];

    // Validate defender
    // @todo check if defender is protected
    if (defenderId) {
      defenderId = defenderId.slice(2, -1);
      const defender: Player = this.getPlayerById(defenderId);
      if (!defender || (defender === attacker && cardName.toUpperCase() !== 'PRINCE')) return [true, 'You picked an invalid opponent!', attacker];
      return this.resolvePlay(attacker, cardName, defender, guess)
    }
    
    return this.resolvePlay(attacker, cardName);
  }

  getPlayerById(id: string): Player {
    const match = this.players.filter(player => player.id === id)
    if (match.length !== 1) {
      return null;
    }
    return match.pop();
  }

  getPlayerByName(name: string): Player {
    const match = this.players.filter(player => player.name === name)
    if (match.length !== 1) {
      return null;
    }
    return match.pop();
  }

  resolvePlay(attacker: Player, cardName: string, defender?: Player, guess?: string) {
    attacker.removeCard(cardName);
    switch (cardName.toUpperCase()) {
      case 'GUARD':
        return this.guardPlay(attacker, defender, guess);
      case 'PRIEST':
        return this.priestPlay(attacker, defender);
      case 'BARON':
        return this.baronPlay(attacker, defender);
      case 'HANDMAID':
        return this.handmaidPlay(attacker);
      case 'PRINCE':
        return this.princePlay(attacker, defender);
      case 'KING':
        return this.kingPlay(attacker, defender);
      case 'COUNTESS':
        return this.countessPlay(attacker);
      case 'PRINCESS':
      default:
      console.log('wtf');
    }
  }

  private guardPlay(attacker: Player, defender: Player, guess): [boolean, string, Player] {
    const defenderHand = defender.getPlayerCard();
    if (defender.isValidCard(guess)) {
      this.removePlayer(defender);
      this.newTurn();
      return [false, `${attacker.name} guessed correctly! ${defender.name} is out. womp womp.`, null];
    }
    return [false, `${attacker.name} guessed incorrectly!`, null];
  }

  private priestPlay(attacker: Player, defender: Player): [boolean, string, Player] {
    const defenderHand = defender.getPlayerCard();
    this.newTurn();
    return [true, `${defender.name} has a ${defenderHand.name}`, attacker];
  }

  private baronPlay(attacker: Player, defender: Player): [boolean, string, Player] {
    const defenderHand = defender.getPlayerCard();
    const attackerHand = attacker.getPlayerCard();
    if (attackerHand > defenderHand) {
      this.newTurn();
      return [false, `${defender.name}'s ${defenderHand.name} was knocked out by ${attacker.name}`, null];
    }
    this.newTurn();
    return [false, `${attacker.name}'s ${attacker.name} was knocked out by ${defender.name}`, null];
  }

  private handmaidPlay(attacker: Player): [boolean, string, Player] {
    attacker.isProtected = true;
    this.newTurn();
    return [false, `${attacker.name}'s is by protected by a Handmaid until their next turn.`, null];
  }

  private princePlay(attacker: Player, defender: Player): [boolean, string, Player] {
    const defenderHand = defender.getPlayerCard();
    if (defenderHand.name === 'Princess') {
      this.removePlayer(defender);
      this.newTurn();
      return [false, `${defender.name} is knocked out for losing the Princess! womp. womp.`, null];
    }
    defender.removeCard(defenderHand.name);
    this.dealCardToPlayer(defender);
    this.newTurn();
    return [false, `${defender.name} dropped their ${defenderHand.name}`, null];
  }

  private kingPlay(attacker: Player, defender: Player): [boolean, string, Player] {
    const defenderHand = defender.getPlayerCard();
    const attackerHand = attacker.getPlayerCard();
    attacker.hand = Array<Card>(defenderHand);
    defender.hand = Array<Card>(attackerHand);
    this.newTurn();
    return [false, `${defender.name} and ${attacker.name} swapped hands.`, null];
  }

  private countessPlay(attacker: Player): [boolean, string, Player] {
    this.newTurn();
    return [false, `${attacker.name} dropped their Countess...`, null];
  }
}