const generate = require(`../src/generate`);
const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`--generate command`, () => {
  it(`should fail on nonexistent file`, () => {
    const testFileName = `testfile`;

    generate.execute(10, testFileName).then(() => {
      assert.fail(`File ${testFileName} should not be available`);
    }).catch((e) => assert.ok(e));
  });

  it(`should create new file`, () => {
    const testFileName = `testfile`;

    generate.execute(10, testFileName)
        .then(() => access(testFileName))
        .then(() => unlink(testFileName));
  });
});
