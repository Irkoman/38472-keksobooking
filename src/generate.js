const fs = require(`fs`);
const {promisify} = require(`util`);
const writeFile = promisify(fs.writeFile);
const {generateEntity} = require(`./generator/generate-entity`);
const {userInput} = require(`./user-input`);
const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `Generates project data`,
  execute: async () => {
    const {count, filePath} = await userInput();

    if (!count || !filePath) {
      console.log(`Генерация данных отменена. Попробуй указать другое имя файла.`);
      process.exit();
    }

    const entities = [...new Array(count)].map(() => generateEntity());

    try {
      await writeFile(filePath, JSON.stringify(entities), fileWriteOptions);
      console.log(`Данные успешно сгенерированы.`);
      process.exit();
    } catch (error) {
      console.log(`Что-то пошло не так: ${error.red}`);
      process.exit(1);
    }
  }
};
