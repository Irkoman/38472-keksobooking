const fs = require(`fs`);
const {promisify} = require(`util`);
const writeFile = promisify(fs.writeFile);
const userInput = require(`./user-input`);
const {generateOffers} = require(`./generator/generate-offers`);
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `Generates project data`,
  execute: async () => {
    const {count, filePath} = await userInput.getGenerateInfo();

    if (!filePath) {
      console.log(`Генерация данных отменена. Файл может быть перезаписан только после команды ${`yes`.green}.`);
      process.exit();
    }

    const offers = generateOffers(count);

    try {
      await writeFile(filePath, JSON.stringify(offers), fileWriteOptions);
      console.log(`Данные успешно сгенерированы.`);
      process.exit();
    } catch (error) {
      console.log(`Что-то пошло не так: ${error.red}`);
      process.exit(1);
    }
  }
};
