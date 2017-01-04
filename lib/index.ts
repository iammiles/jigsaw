const slackbots = require('slackbots');
import { Guard } from './Card';
const settings: Object = {
  token: 'xoxb-14894531971-nPmaw4gT0m3T8qAeaYZ6HXze',
  name: 'jigsaw',
};
let x: number = 5;
let c = new Guard("miles", 5, 5);
c.testProtection();
c.updateProtection();
c.testProtection();
console.log(c.help());
let jigsaw = new slackbots(settings);

// jigsaw.on('start', () => {
//     jigsaw.postMessageToChannel('flux', 'Hello channel!');
//     jigsaw.postMessageToUser('iammiles', 'hello bro!');
// });

console.log(x);
console.log(x);