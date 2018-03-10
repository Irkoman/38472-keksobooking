const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const url = process.env.MONGO_URL || `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`keksobooking`))
    .catch((error) => {
      logger.error(`Не удалось подключиться к MongoDB`, error);
      process.exit(1);
    });
