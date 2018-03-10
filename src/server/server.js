const express = require(`express`);
const offerStore = require(`./offers/store`);
const imageStore = require(`./images/store`);
const offersRouter = require(`./offers/route`)(offerStore, imageStore);
const logger = require(`../logger`);

const app = express();
app.use(express.static(`static`));
app.use(`/api/offers`, offersRouter);

const HOSTNAME = process.env.SERVER_HOST || `localhost`;
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

module.exports = {
  name: `--server`,
  description: `Starts server`,
  execute: async () => {
    app.listen(PORT, HOSTNAME, () => {
      return logger.info(`Server is running at http://${HOSTNAME}:${PORT}/`);
    });
  },
  app
};
