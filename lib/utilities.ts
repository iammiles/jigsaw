import { Card, typesOfCards } from './Card';
import { jigsaw } from './index';
import { GAME_CHANNEL, BOT_NAME, BOT_TOKEN } from './settings';

export const BOT_SETTINGS = {
  name: BOT_NAME,
  token: BOT_TOKEN,
};

export const gameChannel: string = GAME_CHANNEL;

/**
 * Straight up copying http://stackoverflow.com/a/12646864
 * A clever implementation of the Fisher-Yates shuffle
*/
export const shuffle = (arr: Array<any>): Array<any> => {
  for (let i:number = arr.length - 1; i > 0; i--) {
    let j:number = Math.floor(Math.random() * (i + 1));
    let temp: any = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

export const spamChannel = (msg: string): void => {
  jigsaw.postMessageToChannel(gameChannel, msg);
}

export const spamUser = (user: string, msg: any): void => {
  jigsaw.postMessageToUser(user, msg);
}

export const wtf = (user): void => {
  const luck: boolean = Math.floor(Math.random() * 10) + 1 === 7;
  spamUser(user, (luck ? 'English Motherfucker! DO YOU SPEAK IT?!' : 'I don\'t under understand that command. Try !commands to see a list of commands.'));
}

export const helpMsg: string = 'To Learn the rules, type "!rules".\n To see a list of of commands, type "!commands".\n';
export const commandsMsg: string = `!join - Join a game before it starts
!start - Start a game
!quit - Leave the game
!rules - Learn about the rules of the game
!cards - Learn about the various cards in the game

!play - Play a card.  Use the following template !play cardname @username
Card names are not case-sensitive.
**Note** Some cards don't require a user, such as the Handmaid, some cards you can play against yourself, such as the Prince.
To play a guard, pass an additional paramter for the name of the card you are trying to guess.
Examples:
!play handmaid
!play prince @bob
!play guard @bob king

!hand - See what's in your hand
`;

export const rulesMsg: string  = `Objective:
The objective of the game is to win the token of affection from the Princess.

Gameplay:
To begin, there are 16 cards in the deck. One card is discarded for the game, and then 1 card is dealt to the remaining players.
On the player's turn, they will be dealt an additional card and they will choose which of their two cards to play.
Each player continues to take turns until the deck has run out of cards to deal.

Endgame:
The game ends when there is only one person left in the game (and they are the winner) or there are no more cards left to deal.  Whichever comes first.
When there are no more remaining cards, the player with the highest point value card wins the game.

Cards:
There are a total number of 16 cards. Each card has its own point value, name, the starting quantity in a deck, and a description of the action it performs.
Type "!cards" to learn more about the cards and their actions.
`;

export const cardsMsg: string = typesOfCards.map(card => `[${card.value}] ${card.name} (${card.qty}): ${card.description} \n`).reduce((a, b) => a + b);