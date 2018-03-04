const {
  oneOf,
  someOf,
  inRange,
  inTextRange,
  isNumeric,
  isImage,
  isSetOfImages,
  isUnique
} = require(`../../../helpers/assertion-helper`);

const {getRandomFromArray} = require(`../../../helpers/random-helper`);

const {
  TYPES,
  CHECKINS,
  FEATURES,
  NAMES
} = require(`../../../helpers/generation-helper`);

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 140;
const MIN_ADDRESS_LENGTH = 7;
const MAX_ADDRESS_LENGTH = 100;
const MIN_DESCRIPTION_LENGTH = 30;
const MAX_DESCRIPTION_LENGTH = 350;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 30;

const offerSchema = {
  'title': {
    required: true,
    converter: (value) => value.trim(),
    assertions: [
      inTextRange(MIN_TITLE_LENGTH, MAX_TITLE_LENGTH)
    ]
  },
  'address': {
    required: true,
    converter: (value) => value.toString(),
    assertions: [
      inTextRange(MIN_ADDRESS_LENGTH, MAX_ADDRESS_LENGTH)
    ]
  },
  'price': {
    required: true,
    assertions: [
      isNumeric(), inRange(1, 1000000)
    ]
  },
  'type': {
    required: true,
    assertions: [
      oneOf(TYPES)
    ]
  },
  'rooms': {
    required: true,
    assertions: [
      isNumeric(), inRange(0, 1000)
    ]
  },
  'checkin': {
    converter: (value) => value.toString(),
    assertions: [
      oneOf(CHECKINS)
    ]
  },
  'checkout': {
    converter: (value) => value.toString(),
    assertions: [
      oneOf(CHECKINS)
    ]
  },
  'features': {
    assertions: [
      someOf(FEATURES), isUnique()
    ]
  },
  'description': {
    converter: (value) => value.trim(),
    assertions: [
      inTextRange(MIN_DESCRIPTION_LENGTH, MAX_DESCRIPTION_LENGTH)
    ]
  },
  'name': {
    converter: (value) => value ? value.trim() : getRandomFromArray(NAMES),
    assertions: [
      inTextRange(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
    ]
  },
  'avatar': {
    assertions: [
      isImage()
    ]
  },
  'photos': {
    assertions: [
      isSetOfImages()
    ]
  }
};

module.exports = offerSchema;
