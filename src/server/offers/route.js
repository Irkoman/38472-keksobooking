const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const createStreamFromBuffer = require(`../../helpers/stream-helper`);
const {validate} = require(`../../helpers/validation-helper`);
const {NAMES} = require(`../../helpers/generation-helper`);
const {getRandomFromArray} = require(`../../helpers/random-helper`);
const QueryError = require(`../errors/query-error`);
const ValidationError = require(`../errors/validation-error`);
const NotFoundError = require(`../errors/not-found-error`);
const querySchema = require(`./schemas/query-schema`);
const offerSchema = require(`./schemas/offer-schema`);
const logger = require(`../../logger`);
const upload = multer({storage: multer.memoryStorage()});

const SUCCESS_CODE = 200;
const BAD_REQUEST_CODE = 400;

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 20;

const offersRouter = new Router();

offersRouter.use(bodyParser.json());

offersRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

const toPage = async (cursor, skip, limit) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

const asyncFn = (fn) => (req, res, next) => fn(req, res, next).catch(next);

offersRouter.get(``, asyncFn(async (req, res) => {
  const errors = validate(req.query, querySchema);

  if (errors.length > 0) {
    throw new QueryError(errors);
  }

  const offers = await offersRouter.offerStore.getAllOffers();
  const skip = +req.query.skip || DEFAULT_SKIP;
  const limit = +req.query.limit || DEFAULT_LIMIT;
  res.send(await toPage(offers, skip, limit));
}));

offersRouter.get(`/:date`, asyncFn(async (req, res) => {
  const date = +req.params.date;
  const offer = await offersRouter.offerStore.getOffer(date);

  if (!offer) {
    throw new NotFoundError(`Не найдено объявление с датой ${date}.`);
  } else {
    res.status(SUCCESS_CODE).send(offer);
  }
}));

offersRouter.get(`/:date/avatar`, asyncFn(async (req, res) => {
  const date = +req.params.date;
  const offer = await offersRouter.offerStore.getOffer(date);

  if (!offer) {
    throw new NotFoundError(`Не найдено объявление с датой ${date}.`);
  }

  const avatar = offer.avatar;

  if (!avatar) {
    throw new NotFoundError(`В объявлении с датой ${date} нет фото арендодателя.`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`Файл не нвйден.`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

offersRouter.post(``, upload.single(`avatar`), asyncFn(async (req, res) => {
  const data = req.body;
  const coordinates = data.address.split(`, `);
  const avatar = req.file;

  data.price = +req.body.price;
  data.rooms = +req.body.rooms;
  data.capacity = +req.body.capacity;
  data.location = {x: +coordinates[0], y: +coordinates[1]};
  data.name = req.body.name || getRandomFromArray(NAMES);
  data.date = req.body.date || Date.now();

  if (avatar) {
    data.avatar = avatar;
  }

  logger.info(`Получены данные от пользователя: `, data);

  const errors = validate(data, offerSchema);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype
    };

    await offersRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo;
  }

  await offersRouter.offerStore.save(data);
  res.send(data);
}));

offersRouter.use((exception, req, res, next) => {
  const code = exception.code || BAD_REQUEST_CODE;

  res.status(code).send(exception);
  next();
});

module.exports = (offerStore, imageStore) => {
  offersRouter.offerStore = offerStore;
  offersRouter.imageStore = imageStore;

  return offersRouter;
};
