const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server/server`);

describe(`GET /api/offers`, () => {
  it(`responds with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.total, 40);
          assert.equal(offers.data.length, 20);
          assert.equal(Object.keys(offers).length, 4);
        });
  });

  it(`responds with 404 on unknown address`, () => {
    return request(app)
        .get(`/api/abcdefghijklmnopqrstuvwxyz`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });

  it(`responds correctly on skip and limit queries`, () => {
    return request(app)
        .get(`/api/offers?skip=7&limit=10`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.total, 40);
          assert.equal(offers.skip, 7);
          assert.equal(offers.limit, 10);
          assert.equal(offers.data.length, 10);
          assert.equal(Object.keys(offers).length, 4);
        });
  });

  it(`responds with 400 on incorrect skip query`, () => {
    return request(app)
        .get(`/api/offers?skip=brbrbr`)
        .set(`Accept`, `application/json`)
        .expect(400);
  });

  it(`responds with 400 on incorrect limit query`, () => {
    return request(app)
        .get(`/api/offers?limit=brbrbr`)
        .set(`Accept`, `application/json`)
        .expect(400);
  });
});
