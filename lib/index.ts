const slackbots = require('slackbots');
import { Deck } from './Deck';
const settings: Object = {
  token: 'xoxb-14894531971-nPmaw4gT0m3T8qAeaYZ6HXze',
  name: 'jigsaw',
};

// let c = new Guard("miles", 5, 5);
// c.testProtection();
// c.updateProtection();
// c.testProtection();
// console.log(c.help());
let jigsaw = new slackbots(settings);
let d = new Deck();
d.whatIsDeck();
// jigsaw.on('start', () => {
//     jigsaw.postMessageToChannel('flux', 'Hello channel!');
//     jigsaw.postMessageToUser('iammiles', 'hello bro!');
// });
