const fs = require(`fs`);
const readline = require(`readline`);
const {promisify} = require(`util`);
const access = promisify(fs.access);

const MIN_PORT = 1024;
const MAX_PORT = 49150;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

module.exports = {
  getGenerateInfo: async () => {
    const answer = await prompt(`Сколько элементов нужно сгенерировать? `);
    const count = parseInt(answer, 10);

    if (count) {
      const enteredFilename = await prompt(`Укажи имя файла, в котором будут сохранены данные.\nИли нажми ${`Enter`.green}, тогда в текущей директории будет создан файл ${`data.json`.green} `);
      const fileName = enteredFilename || `data`;
      const filePath = `${process.cwd()}/${fileName}.json`;

      try {
        await access(filePath, fs.constants.W_OK);
        const rewrite = await prompt(`Такой файл уже существует. Если хочешь перезаписать его, набери ${`yes`.green}: `);
        return (rewrite === `yes`) ? {count, filePath} : {};
      } catch (error) {
        console.log(`Создаю файл с именем ${`${fileName}.json`.blue}...`);
        return {count, filePath};
      }
    } else {
      console.log(`Это не число, шалунишка!`.red);
      process.exit(1);
      return {};
    }
  },
  getServerInfo: async () => {
    const answer = await prompt(`Введи номер порта, на котором должен быть запущен сервер.\nИли нажми ${`Enter`.green}, тогда будет использован порт по умолчанию — ${`3000`.green} `);
    const port = answer || `3000`;

    if (!parseInt(port, 10) || port < MIN_PORT || port > MAX_PORT) {
      console.log(`Номер порта должен быть числом в диапазоне от ${MIN_PORT} до ${MAX_PORT}.`.red);
      process.exit(1);
    }

    return port;
  }
};
