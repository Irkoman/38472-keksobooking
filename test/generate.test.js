const generate = require(`../src/generate`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`--generate command`, () => {
  it(`should fail on nonexistent folder`, () => {
    const tempFileName = `${__dirname}/folder/testfile.json`;

    return generate.execute(10, tempFileName).then(() => {
      assert.fail(`Path ${tempFileName} should not be available`);
    }).catch((e) => assert.ok(e));
  });

  it(`should create new file`, () => {
    const tempFileName = `${__dirname}/testfile.json`;

    return generate.execute(10, tempFileName)
        .then(() => access(tempFileName))
        .then(() => unlink(tempFileName));
  });
});
