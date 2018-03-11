const {
  generateOffers,
  TYPES,
  CHECKINS,
  FEATURES,
  PHOTOS
} = require(`../src/helpers/generation-helper`);
const assert = require(`assert`);

const {offer, location} = generateOffers(1)[0];

describe(`Generated entity: #offer`, () => {
  it(`#title is a string value`, () => {
    assert.equal(typeof offer.title, `string`);
  });

  it(`#address is a string value`, () => {
    assert.equal(typeof offer.address, `string`);
  });

  it(`#price is a number from 1000 to 1000000`, () => {
    assert.ok((offer.price) >= 1000 && (offer.price <= 1000000), true);
  });

  it(`#type is one of 'flat'|'palace'|'house'|'bungalo'`, () => {
    assert.ok(TYPES.includes(offer.type), true);
  });

  it(`#rooms is a number from 1 to 5`, () => {
    assert.ok((offer.rooms) > 0 && (offer.rooms < 6), true);
  });

  it(`#capacity is a number`, () => {
    assert.equal(typeof offer.capacity, `number`);
  });

  it(`#checkin is one of '12:00'|'13:00'|'14:00'`, () => {
    assert.ok(CHECKINS.includes(offer.checkin), true);
  });

  it(`#checkout is one of '12:00'|'13:00'|'14:00'`, () => {
    assert.ok(CHECKINS.includes(offer.checkout), true);
  });

  it(`#features is an array of definite strings`, () => {
    assert.ok(offer.features.every((feature) => FEATURES.includes(feature)), true);
  });

  it(`#description is an empty string`, () => {
    assert.strictEqual(offer.description, ``);
  });

  it(`#avatar path is a string value`, () => {
    assert.equal(typeof offer.avatar, `string`);
  });

  it(`#avatar path starts with https://robohash.org/`, () => {
    assert.ok(offer.avatar.startsWith(`https://robohash.org/`), true);
  });

  it(`#photos is an array of definite strings`, () => {
    assert.ok(offer.photos.every((photo) => PHOTOS.includes(photo)), true);
  });
});

describe(`Generated entity: #location`, () => {
  it(`#x and #y are integers`, () => {
    assert.ok(Number.isInteger(location.x) && Number.isInteger(location.y), true);
  });

  it(`#x is a number from 300 to 900`, () => {
    assert.ok((location.x) >= 300 && (location.x <= 900), true);
  });

  it(`#y is a number from 150 to 500`, () => {
    assert.ok((location.y) >= 150 && (location.y <= 500), true);
  });
});
