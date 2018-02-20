const {
  getRandomString,
  getMixedArray,
  getRandomFromArray,
  getRandomFromRange
} = require(`../helpers/random-helper`);

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];

const TYPES = [
  `flat`,
  `palace`,
  `house`,
  `bungalo`
];

const CHECKINS = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const generateEntity = () => {
  const location = {
    x: getRandomFromRange(300, 900),
    y: getRandomFromRange(150, 500)
  };

  return {
    author: {
      avatar: `https://robohash.org/${getRandomString()}?bgset=bg1`
    },
    offer: {
      title: getRandomFromArray(TITLES),
      address: `${location.x}, ${location.y}`,
      price: getRandomFromRange(1000, 1000000),
      type: getRandomFromArray(TYPES),
      rooms: getRandomFromRange(1, 5),
      guests: getRandomFromRange(1, 150),
      checkin: getRandomFromArray(CHECKINS),
      checkout: getRandomFromArray(CHECKINS),
      features: getMixedArray(FEATURES).slice(getRandomFromRange(0, FEATURES.length - 1)),
      description: ``,
      photos: getMixedArray(PHOTOS)
    },
    location
  };
};

module.exports = {
  generateEntity,
  TYPES,
  CHECKINS,
  FEATURES,
  PHOTOS
};
