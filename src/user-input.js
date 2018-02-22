const fs = require(`fs`);
const readline = require(`readline`);
const {promisify} = require(`util`);
const access = promisify(fs.access);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => new Promise((resolve) => rl.question(question, resolve));

const userInput = async () => {
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
};

module.exports = {
  userInput
};
