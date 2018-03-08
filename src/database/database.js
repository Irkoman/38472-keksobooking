const {MongoClient} = require(`mongodb`);

const url = `mongodb://localhost:27017`;

module.exports = MongoClient.connect(url)
    .then((client) => client.db(`keksobooking`))
    .catch((error) => {
      console.error(`Не удалось подключиться к MongoDB`, error);
      process.exit(1);
    });
