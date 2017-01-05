const slackbots = require('slackbots');

export class Jigsaw {
  gameChannel: string;
  name: string;
  token: string;
  jigsaw: any;
  users: Array<any>;
  constructor(gameChannel: string, name: string, token: string) {
    this.gameChannel = gameChannel;
    this.name = name;
    this.token = token;
    this.users = Array<any>();
    this.jigsaw = new slackbots({token: this.token, name: this.name});

    this.jigsaw.on('start', () => {
      this.jigsaw.postMessageToChannel(this.gameChannel, 'Who wants to play a game?');
    });

    this.jigsaw.on('message', (data) => {
      if (data.type === 'message' && data.subtype !== 'bot_message' && this.isNonEmptyMsg(data.text)) {
        console.log(data);
        Promise.all([this.isProperChannel(data.channel), this.getMessenger(data)]).then((res) => {
          console.log('res', res);
        })
      }
    });
  }

  async initUsers(): Promise<any> {
    const response = await this.jigsaw.getUsers();
    return response.members;
  }

  async getMessenger(data): Promise<any> {
    const user = await this.jigsaw.getUserById(data.user);
    return user.name;
  }

  async isProperChannel(id: string): Promise<any> {
    const channel = await this.jigsaw.getChannelById(id);
    return this.gameChannel === channel.name;
  }

  isNonEmptyMsg(msg: string): boolean { 
    return Boolean(msg.trim())
  }
}