import { Deck } from './Deck';
import { Card } from './Card';
import { Player } from './Player';
import { shuffle, isValidCard } from './utilities';

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
  }

  dealCardsToPlayers(): void {
    if (this.gameStatus === GameStatus.GameStart) {
      this.players.forEach(player => {
        player.hand.push(this.deck.dealCard());
      });
    }
  }

  dealCardToPlayer(p: Player): void {
    if (this.gameStatus === GameStatus.GameStart) {
      p.hand.push(this.deck.dealCard());
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
    let [, cardName, defenderId] = cmd;
    let error: boolean = false;
    let msg: string = '';

     // Validate cardName
    if (!isValidCard(cardName)) return [true, 'You picked an invalid card!', attacker];

    // Validate defender
    if (defenderId) {
      defenderId = defenderId.slice(2, -1);
      const defender: Player = this.getPlayerById(defenderId);
      if (!defender || (defender === attacker && cardName.toUpperCase() !== 'PRINCE')) return [true, 'You picked an invalid opponent!', attacker];
      this.resolvePlay(attacker, cardName, defender)
    }
    
    this.resolvePlay(attacker, cardName);

    if (error) {
      return [error, 'Sorry, I had trouble understanding your play.  Please try again.', null];
    }
    return [error, msg, null];
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

  resolvePlay(attacker: Player, cardName: string, defender?: Player) {

  }


}