import { Deck } from './Deck';
import { Card } from './Card';
import { Player } from './Player';
import { shuffle } from './utilities';

const enum GameStatus {
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

  endGame(): void {
    this.gameStatus = GameStatus.GameEnd;
  }


}