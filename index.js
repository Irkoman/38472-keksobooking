require(`dotenv`).config();
const intro = require(`./src/intro`);
const version = require(`./src/version`);
const help = require(`./src/help`);
const author = require(`./src/author`);
const license = require(`./src/license`);
const description = require(`./src/description`);
const error = require(`./src/error`);
const generate = require(`./src/generate`);
const server = require(`./src/server/server`);

const COMMANDS = {
  [version.name]: version.execute,
  [help.name]: help.execute,
  [author.name]: author.execute,
  [license.name]: license.execute,
  [description.name]: description.execute,
  [generate.name]: generate.execute,
  [server.name]: server.execute
};

const command = process.argv[2];

if (!command) {
  intro.execute();
}

if (!COMMANDS[command]) {
  error.execute(command);
}

COMMANDS[command]();
