import { Game } from './Game';
import { Player } from './Player';

const slackbots = require('slackbots');

const gameChannel: string = 'flux';
const bot_settings = {
  name: 'jigsaw',
  token: 'xoxb-14894531971-nPmaw4gT0m3T8qAeaYZ6HXze',
}

const jigsaw = new slackbots(bot_settings);

const g = new Game();
console.log(g.deck.pile.length);

jigsaw.on('start', () => {
 // jigsaw.postMessageToChannel(gameChannel, 'Who wants to play a game?');
});

jigsaw.on('message', (data) => {
  if (data.type === 'message' && data.subtype !== 'bot_message' && isNonEmptyMsg(data.text)) {
    Promise.all([isProperChannel(data.channel), getMessenger(data)]).then((res) => {
      const [isGameChannel, user] = res;
      const command = parseCommand(data.text);

      if (isGameChannel && command[0].charAt(0) === '!') {
        switch(command[0]) {
          case '!start':
            startGame(g.gameStatus === 0);
          break;
          case '!join':
            playerJoined(user, data.user);
          break;
          case '!play':
          case '!quit':
          case '!help':
          case '!rules':
          case '!commands':
          default:
            wtf(user, data);
        }
      }
    })
  }
});

const wtf = (user, data) => {
  console.log('text', data.text);
  g.players.forEach((player) => {
    console.log('player', player)
    //console.log('hand', player.hand);
  })
  console.log('dec', g.deck.pile.length);
  const luck: boolean = Math.floor(Math.random() * 10) + 1 === 7;
  spamUser(user, (luck ? 'English Motherfucker! DO YOU SPEAK IT?!' : 'I don\'t under understand that command. Try !commands to see a list of commands.'));
}


const playerJoined = (user: string, userId: string): void => {
  if (g.players.filter(player => player.name === user).length < 1 && g.gameStatus == 0) {
    g.addPlayer(new Player(user, userId));
    spamUser(user, `Alright ${user}, you've joined the game!  If you have any questions, type !help.`);
  } else {
    spamUser(user, (g.gameStatus === 0 ? 'You\'re already in the game!' : 'Sorry, game has already begun!')); 
  }
}

const startGame = (isPreGame: boolean) => {
  if (isPreGame) {
    g.startGame();
    spamChannel('Alright, let\'s play some Love Letter!');
    spamChannel(`Here are the players and their order:
    ${g.players.map(player => player.name)}`);
  } else {
    spamChannel('A game is already in progress!');
  }
}

const isNonEmptyMsg = (msg: string): boolean => { return Boolean(msg.trim()) };

const getMessenger = async (data): Promise<any> => {
  const user = await jigsaw.getUserById(data.user);
  return user.name;
}

const isProperChannel = async (id: string): Promise<any> => {
  const channel = await jigsaw.getChannelById(id);
  return gameChannel === channel.name;
}

const parseCommand = (msg: string): Array<string> => {
  return msg.split(' ');
}

const spamChannel = (msg: string): void => {
  jigsaw.postMessageToChannel(gameChannel, msg);
}

const spamUser = (user: string, msg: string): void => {
  jigsaw.postMessageToUser(user, msg);
}

/**
 * TODO:
 * make players
 * deal card to players
 */