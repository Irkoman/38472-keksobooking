const version = require(`./src/version`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);
const blank = require(`./src/blank`);
const error = require(`./src/error`);
const generate = require(`./src/generate`);

const COMMANDS = {
  [version.name]: version.execute,
  [help.name]: help.execute,
  [author.name]: author.execute,
  [license.name]: license.execute,
  [description.name]: description.execute,
  [generate.name]: generate.execute
};

const command = process.argv[2];

if (!command) {
  blank.execute();
}

if (!COMMANDS[command]) {
  error.execute(command);
}

COMMANDS[command]();
