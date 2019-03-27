## Synopsis

Jigsaw slackbot implementation of the game [Love Letter](https://boardgamegeek.com/boardgame/129622/love-letter)!  Written in Typescript.  

## Installation

* First you need to create a bot and get its token from slack.  This can be done [here](https://my.slack.com/services/new/bot).
* Edit `./lib/settings.ts` and give it an appropriate channel name, bot name, and the token you created earlier.
* Push to whatever node environment you have set up, run `npm install` to get the dependencies.
* Finally run `npm run start` to start up the bot! If all is successful it'll let itself known in the game channel you specified.


## TODO / Roadmap
* ** TESTS **
* Restrict number of players to 7.
* Allow for multiple rounds to collect tokens of affection like the original

**This is very much a work in progress. There are probably a few bugs and edge cases not accounted for.**

## Tests

This should really get done.

## License

MIT
