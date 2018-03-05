const {isNumeric} = require(`../../../helpers/assertion-helper`);

const querySchema = {
  'skip': {
    required: false,
    assertions: [
      isNumeric()
    ]
  },
  'limit': {
    required: false,
    assertions: [
      isNumeric()
    ]
  }
};

module.exports = querySchema;
