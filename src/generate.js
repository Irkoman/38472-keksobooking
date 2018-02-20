const {generateEntity} = require(`./generator/generate-entity`);
const {promisify} = require(`util`);
const fs = require(`fs`);
const writeFile = promisify(fs.writeFile);

const fileWriteOptions = {encoding: `utf-8`, mode: 0o644};

module.exports = {
  name: `--generate`,
  description: `Generates project data`,
  execute(entitiesCount = 8, filePath = `${process.cwd()}/data.json`) {
    const entities = [...new Array(parseInt(entitiesCount, 10))].map(() => generateEntity());

    return writeFile(filePath, JSON.stringify(entities), fileWriteOptions)
        .then(() => console.log(`File created successfully`))
        .catch((error) => console.log(error));
  }
};
