import { Deck } from './Deck';
import { Card, typesOfCards } from './Card';
import { Player } from './Player';
import { shuffle, spamUser, spamChannel, wtf } from './utilities';

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
    this.players = this.players.filter(player => player.name != p.name);
  }

  startGame(): void {
    this.gameStatus = GameStatus.GameStart;
    this.dealCardsToPlayers();
    this.players = shuffle(this.players)
    this.players[0].isTurn = true;
    this.dealCardToPlayer(this.players[0]);
    spamChannel(`${this.players[0].name} it's your turn!`);
  }

  newTurn(): void {
    if (this.players.length === 1) {
      this.endGame();
      return;
    }
    const oldPlayer = this.players.shift();
    oldPlayer.isTurn = false;
    this.players[0].isTurn = true;
    this.players[0].isProtected = false;
    this.players.push(oldPlayer);
    this.dealCardToPlayer(this.players[0])
    spamChannel(`${this.players[0].name} it's your turn!`);
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
      this.endGame();
    }
  }

  // @TODO: deal with ties
  compareHands(): Player {
    return this.players.sort((a, b) => b.highestValueCard().value - a.highestValueCard().value).shift();
  }

  getWinRar(): Player {
    if (this.players.length === 1) {
      return this.players[0];
    } else {
      return this.compareHands();
    }
  }

  endGame(): void {
    const winrar = this.getWinRar();
    spamChannel(`${winrar.name} gets to bang the Princes... erm, Wins a token of affection from Her Majesty!`);
    this.gameStatus = GameStatus.GameEnd;
  }

  validatePlay(attacker: Player, cmd: Array<string>): void {
    // Validate game status and player's turn
    if (this.gameStatus !== GameStatus.GameStart) { spamChannel('Game has not started yet!'); return; }
    if (!attacker.isTurn) { spamUser(attacker.name, 'It\'s not your turn!'); return; }

    let [, cardName, defenderId, guess] = cmd;
    // Validate cardName
    if (!Boolean(cardName.trim()) || !attacker.isValidCard(cardName)) { spamUser(attacker.name, 'You picked an invalid card!'); return; }

    // Validate defender
    if (defenderId) {
      defenderId = defenderId.slice(2, -1);
      const defender: Player = this.getPlayerById(defenderId);
      //check if we have a valid defender
      if (!defender || defender.isProtected) { spamUser(attacker.name, 'You picked an invalid opponent!'); return; }

      // check if defender isn't self in all cases but prince
      // also check if everyone else is protected by handmaid.  in this case the only valid play against a defender is a prince against themself
      if (defender === attacker && cardName.toUpperCase() !== 'PRINCE') {
        const otherPlayers: Array<Player> = this.players.filter(player => player.name !== attacker.name);
        const isEveryoneProtected: boolean = otherPlayers.filter(player => player.isProtected !== true).length === 0;
        if (isEveryoneProtected) {
          spamChannel(`Everyone is protected by handmaid.  Discarding ${cardName}`);
          attacker.removeCard(cardName);
          this.newTurn();
          return;
        }
        spamUser(attacker.name, 'You can\'t pick yourself with that card!');
        return; 
      }
      // Valid attack with defender
      this.resolvePlay(attacker, cardName, defender, guess); return;
    }
    // attacker didn't specify an opponent?  make sure they played a valid card.
    const cardsWithOutOpponent = typesOfCards.filter(card => card.requiresDefender === false);
    const properPlayWithOpponent: boolean = cardsWithOutOpponent.some(card => card.name.toUpperCase() === cardName.toUpperCase());
    if (!properPlayWithOpponent) { spamUser(attacker.name, `${cardName} can't be used without specifying an opponent.`); return; }
    // Valid play without defender
    this.resolvePlay(attacker, cardName); return;
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
        this.guardPlay(attacker, defender, guess);
      break;
      case 'PRIEST':
        this.priestPlay(attacker, defender);
      break;
      case 'BARON':
        this.baronPlay(attacker, defender);
      break;
      case 'HANDMAID':
        this.handmaidPlay(attacker);
      break;
      case 'PRINCE':
        this.princePlay(attacker, defender);
      break;
      case 'KING':
        this.kingPlay(attacker, defender);
      break;
      case 'COUNTESS':
        this.countessPlay(attacker);
      break;
      case 'PRINCESS':
        spamUser(attacker.name, 'You can\'t  actually play the princess!');
      break;
      default:
        wtf(attacker.name);
    }
  }

  private guardPlay(attacker: Player, defender: Player, guess): void {
    const defenderHand = defender.getPlayerCard();
    if (defender.isValidCard(guess)) {
      this.removePlayer(defender);
      this.newTurn();
      spamChannel(`${attacker.name} guessed correctly! ${defender.name} is out. womp womp.`);
    }
    this.newTurn();
    spamChannel(`${attacker.name} guessed incorrectly!`);
  }

  private priestPlay(attacker: Player, defender: Player): void {
    const defenderHand = defender.getPlayerCard();
    this.newTurn();
    spamUser(attacker.name,`${defender.name} has a ${defenderHand.name}`);
  }

  private baronPlay(attacker: Player, defender: Player): void {
    const defenderHand = defender.getPlayerCard();
    const attackerHand = attacker.getPlayerCard();

    if (attackerHand.value > defenderHand.value) {
      this.removePlayer(defender);
      this.newTurn();
      spamChannel(`${defender.name}'s ${defenderHand.name} was knocked out by ${attacker.name}`);
    } else {
      this.removePlayer(attacker);
      this.newTurn();
      spamChannel(`${attacker.name}'s ${attackerHand.name} was knocked out by ${defender.name}`);
    }
  }

  private handmaidPlay(attacker: Player): void{
    attacker.isProtected = true;
    this.newTurn();
    spamChannel(`${attacker.name}'s is by protected by a Handmaid until their next turn.`);
  }

  private princePlay(attacker: Player, defender: Player): void {
    const defenderHand = defender.getPlayerCard();
    defender.removeCard(defenderHand.name);
    this.dealCardToPlayer(defender);
    this.newTurn();
    spamChannel(`${defender.name} dropped their ${defenderHand.name}`);
    if (defenderHand.name === 'Princess') {
      this.removePlayer(defender);
      spamChannel(`${defender.name} is knocked out for losing the Princess! womp. womp.`);
    }
  }

  private kingPlay(attacker: Player, defender: Player): void {
    const defenderHand = defender.getPlayerCard();
    const attackerHand = attacker.getPlayerCard();
    attacker.hand = Array<Card>(defenderHand);
    defender.hand = Array<Card>(attackerHand);
    this.newTurn();
    spamChannel(`${defender.name} and ${attacker.name} swapped hands.`);
  }

  private countessPlay(attacker: Player): void {
    this.newTurn();
    spamChannel(`${attacker.name} dropped their Countess...`);
  }
}