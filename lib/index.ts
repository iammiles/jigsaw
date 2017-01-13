import { Game, GameStatus } from './Game';
import { Player } from './Player';
import { gameChannel, BOT_SETTINGS, spamChannel, spamUser, wtf, helpMsg, rulesMsg, commandsMsg, cardsMsg } from './utilities';

const slackbots = require('slackbots');

export const jigsaw = new slackbots(BOT_SETTINGS);

const g = new Game();

jigsaw.on('start', () => {
  spamChannel('I want to play a game.\nType "!join" or "!help" to get started.');
});

jigsaw.on('message', (data) => {
  if (data.type === 'message' && data.subtype !== 'bot_message' && isNonEmptyMsg(data.text)) {
    Promise.all([isProperChannel(data.channel), getMessenger(data)]).then((res) => {
      const [isGameChannel, user] = res;
      const command = parseCommand(data.text);

      if ((isGameChannel || data.channel.charAt(0) === 'D') && command[0].charAt(0) === '!') {
        switch(command[0]) {
          case '!start':
            startGame(g.gameStatus === GameStatus.PreGame);
          break;
          case '!join':
            playerJoined(user, data.user);
          break;
          case '!play':
            g.validatePlay(g.getPlayerByName(user), command);
          break;
          case '!quit':
            spamUser(user, 'Goodbye. :-(');
            g.removePlayer(g.getPlayerByName(user));
          break;
          case '!hand':
            spamUser(user, g.getPlayerByName(user).getReadablePlayerHand());
          break;
          case '!help':
            spamUser(user, helpMsg);
          break;
          case '!rules':
            spamUser(user, rulesMsg);
          break;
          case '!commands':
            spamUser(user, commandsMsg);
          break;
          case '!cards':
            spamUser(user, cardsMsg);
          break;
          default:
            wtf(user);
        }
      }
    });
  }
});

const playerJoined = (user: string, userId: string): void => {
  if (g.players.filter(player => player.name === user).length < 1 && g.gameStatus === GameStatus.PreGame) {
    g.addPlayer(new Player(user, userId));
    spamUser(user, `Alright ${user}, you've joined the game!  If you have any questions, type !help.`);
  } else {
    spamUser(user, (g.gameStatus === GameStatus.PreGame ? 'You\'re already in the game!' : 'Sorry, game has already begun!')); 
  }
}

const startGame = (isPreGame: boolean): void => {
  if (isPreGame) {
    announcePlayers();
    g.startGame();
  } else {
    spamChannel('A game is already in progress!');
  }
}

const announcePlayers = (): void => {
  spamChannel(`Here are the players and their order:
  ${g.players.map(player => player.name)}`);
}

const isNonEmptyMsg = (msg: string): boolean => { return Boolean(msg.trim()) };

const getMessenger = async (data): Promise<any> => {
  const user = await jigsaw.getUserById(data.user);
  return user.name;
}

const isProperChannel = async (id: string): Promise<any> => {
  // @todo proper error handling, but really, who can resist big D's?
  if (id.charAt(0) === 'D') {
    return await false;
  }
  const channel = await jigsaw.getChannelById(id);
  return gameChannel === channel.name;
}

const parseCommand = (msg: string): Array<string> => {
  return msg.split(' ');
}