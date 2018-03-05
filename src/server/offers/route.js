const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {generateOffers} = require(`../../generator/generate-offers`);
const {validate} = require(`../../helpers/validation-helper`);
const QueryError = require(`../errors/query-error`);
const querySchema = require(`./schemas/query-schema`);
const upload = multer({storage: multer.memoryStorage()});

const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 20;

const offersRouter = new Router();
const offers = generateOffers(40);

offersRouter.use(bodyParser.json());

const toPage = (data, skip, limit) => {
  return {
    data: data.slice(skip, skip + limit),
    skip,
    limit,
    total: data.length
  };
};

offersRouter.get(``, (req, res) => {
  const errors = validate(req.query, querySchema);

  if (errors.length > 0) {
    throw new QueryError(errors);
  }

  const skip = +req.query.skip || DEFAULT_SKIP;
  const limit = +req.query.limit || DEFAULT_LIMIT;
  res.send(toPage(offers, skip, limit));
});

offersRouter.get(`/:date`, (req, res) => {
  const date = +req.params[`date`];
  const offer = offers.find((it) => it.date === date);

  if (!offer) {
    res.status(404).end();
  } else {
    res.send(offer);
  }
});

offersRouter.post(``, upload.single(`avatar`), (req, res) => {
  res.send(req.body);
});

offersRouter.use((exception, req, res, next) => {
  res.status(400).send(exception);
  next();
});

module.exports = offersRouter;
