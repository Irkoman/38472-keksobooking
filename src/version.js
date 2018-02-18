require(`colors`);
const packageInfo = require(`../package.json`);

module.exports = {
  name: `--version`,
  description: `Shows program version`,
  execute() {
    const versions = packageInfo.version.split(`.`);
    const colors = [`red`, `green`, `blue`];

    const coloredVersions = versions
        .map((version, index) => version[colors[index]])
        .join(`.`);

    console.log(`v${coloredVersions}`);
  }
};
