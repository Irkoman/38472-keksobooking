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
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`address`, `355, 728`)
        .field(`price`, 5000)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .expect(200, {
          title: `Неуютное бунгало по колено в воде`,
          address: `355, 728`,
          price: 5000,
          type: `bungalo`,
          rooms: 5
        });
  });

  it(`should consume form-data with avatar`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Неуютное бунгало по колено в воде`)
        .field(`address`, `355, 728`)
        .field(`price`, 5000)
        .field(`type`, `bungalo`)
        .field(`rooms`, 5)
        .attach(`avatar`, `test/fixtures/success_kid.png`)
        .expect(200, {
          title: `Неуютное бунгало по колено в воде`,
          address: `355, 728`,
          price: 5000,
          type: `bungalo`,
          rooms: 5
        });
  });

  it(`should fail if data is invalid`, () => {
    return request(app).post(`/api/offers`)
        .field(`title`, `Плохой заголовок`)
        .field(`address`, 541)
        .field(`price`, 5000000)
        .field(`type`, `suite`)
        .field(`rooms`, 1001)
        .field(`checkin`, 2300)
        .field(`features`, [`wifi`, `parking`, `wifi`])
        .field(`description`, `Недостаточное описание`)
        .field(`name`, `Нараганзетта Зильберштейн-Пупышева`)
        .attach(`avatar`, `test/fixtures/success_kid.png`)
        .expect(400, {
          name: `Некорректные данные`,
          errors: [{
            field: `title`,
            value: `Плохой заголовок`,
            message: `должно содержать от 30 до 140 символов`
          }, {
            field: `address`,
            value: `541`,
            message: `должно содержать от 7 до 100 символов`
          }, {
            field: `price`,
            value: `5000000`,
            message: `должно находиться в диапазоне от 1 до 1000000`
          }, {
            field: `type`,
            value: `suite`,
            message: `должно быть одним из [flat,palace,house,bungalo]`
          }, {
            field: `rooms`,
            value: `1001`,
            message: `должно находиться в диапазоне от 0 до 1000`
          }, {
            field: `checkin`,
            value: `2300`,
            message: `должно быть одним из [12:00,13:00,14:00]`
          }, {
            field: `features`,
            value: [`wifi`, `parking`, `wifi`],
            message: `не должно содержать повторяющихся значений`
          }, {
            field: `description`,
            value: `Недостаточное описание`,
            message: `должно содержать от 30 до 350 символов`
          }, {
            field: `name`,
            value: `Нараганзетта Зильберштейн-Пупышева`,
            message: `должно содержать от 2 до 30 символов`
          }]
        });
  });
});
