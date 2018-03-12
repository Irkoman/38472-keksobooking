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
  const skip = parseInt(req.query.skip, 10) || DEFAULT_SKIP;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  res.send(await toPage(offers, skip, limit));
}));

offersRouter.get(`/:date`, asyncFn(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = await offersRouter.offerStore.getOffer(date);

  if (!offer) {
    throw new NotFoundError(`Не найдено объявление с датой ${date}.`);
  } else {
    res.status(SUCCESS_CODE).send(offer);
  }
}));

offersRouter.get(`/:date/avatar`, asyncFn(async (req, res) => {
  const date = parseInt(req.params.date, 10);
  const offer = await offersRouter.offerStore.getOffer(date);

  if (!offer) {
    throw new NotFoundError(`Не найдено объявление с датой ${date}.`);
  }

  const avatar = offer.author.avatar;

  if (!avatar) {
    throw new NotFoundError(`В объявлении с датой ${date} нет фото арендодателя.`);
  }

  const {info, stream} = await offersRouter.imageStore.get(avatar.path);

  if (!info) {
    throw new NotFoundError(`Файл не найден.`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

const structurize = (data) => {
  const coordinates = data.address.split(`, `);

  const offer = {
    author: {
      name: data.name || getRandomFromArray(NAMES)
    },
    offer: {
      title: data.title,
      address: data.address,
      description: data.description,
      price: parseInt(data.price, 10),
      type: data.type,
      rooms: parseInt(data.rooms, 10),
      capacity: parseInt(data.capacity, 10),
      checkin: data.checkin,
      checkout: data.checkout,
      features: data.features
    },
    location: {
      x: parseFloat(coordinates[0]),
      y: parseFloat(coordinates[1]),
    },
    date: data.date
  };

  if (data.avatar) {
    offer.author.avatar = data.avatar;
  }

  return offer;
};

offersRouter.post(``, upload.single(`avatar`), asyncFn(async (req, res) => {
  const data = req.body;
  const avatar = req.file;
  data.date = req.body.date || Date.now();

  logger.info(`Получены данные от пользователя: `, data);

  if (avatar) {
    data.avatar = avatar;
  }

  if (data.features && !Array.isArray(data.features)) {
    data.features = [data.features];
  }

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

  const offer = structurize(data);
  await offersRouter.offerStore.save(offer);
  res.send(offer);
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
