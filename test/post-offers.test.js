const request = require(`supertest`);
const {app} = require(`../src/server/server`);

describe(`POST /api/offers`, () => {
  it(`should consume JSON`, () => {
    return request(app).post(`/api/offers`)
        .send({
          author: {
            avatar: `https://robohash.org/dq7cg?bgset=bg1`
          },
          offer: {
            title: `Неуютное бунгало по колено в воде`,
            address: `355, 728`,
            price: 5000,
            type: `bungalo`,
            rooms: 5,
            guests: 2,
            checkin: `14:00`,
            checkout: `14:00`,
            features: [
              `wifi`,
              `parking`
            ],
            description: `Одноэтажный дом для одной семьи. Без детей и животных. Только славяне.`,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`
            ]
          },
          location: {
            x: 355,
            y: 728
          },
          date: 1511275967797
        })
        .expect(200, {
          author: {
            avatar: `https://robohash.org/dq7cg?bgset=bg1`
          },
          offer: {
            title: `Неуютное бунгало по колено в воде`,
            address: `355, 728`,
            price: 5000,
            type: `bungalo`,
            rooms: 5,
            guests: 2,
            checkin: `14:00`,
            checkout: `14:00`,
            features: [
              `wifi`,
              `parking`
            ],
            description: `Одноэтажный дом для одной семьи. Без детей и животных. Только славяне.`,
            photos: [
              `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
              `http://o0.github.io/assets/images/tokyo/hotel2.jpg`
            ]
          },
          location: {
            x: 355,
            y: 728
          },
          date: 1511275967797
        });
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
