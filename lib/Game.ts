import { Deck } from './Deck';
import { Player } from './Player';

const enum GameStatus {
  PreGame,
  GameStart,
  GameEnd,
}

export class Game {
  deck: Deck;
  players: Array<Player>;
  gameStatus: number;
  constructor() {
    this.gameStatus = GameStatus.PreGame;
    this.deck = new Deck();
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
  }

  endGame(): void {
    this.gameStatus = GameStatus.GameEnd;
  }
}