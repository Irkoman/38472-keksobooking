const request = require(`supertest`);
const assert = require(`assert`);
const offerMock = require(`./mocks/offer-mock.json`);
const {app} = require(`../src/server/server`);

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`)
        .send(offerMock)
        .expect(200)
        .then((response) => assert.deepEqual(response.body, offerMock));
  });

  it(`should consume form-data`, () => {
    return request(app).post(`/api/offers`)
        .field(`avatar`, `https://robohash.org/dq7cg?bgset=bg1`)
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`address`, `355, 728`)
        .field(`price`, 5000)
        .field(`type`, `bungalo`)
        .expect(200, {
          avatar: `https://robohash.org/dq7cg?bgset=bg1`,
          title: `Неуютное бунгало по колено в воде`,
          address: `355, 728`,
          price: 5000,
          type: `bungalo`
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`address`, `355, 728`)
        .field(`price`, 5000)
        .field(`type`, `bungalo`)
        .attach(`avatar`, `test/fixtures/success_kid.png`)
        .expect(200, {
          title: `Неуютное бунгало по колено в воде`,
          address: `355, 728`,
          price: 5000,
          type: `bungalo`
        });
  });
});
