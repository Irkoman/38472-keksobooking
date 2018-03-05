const getRandomString = () => Math.random().toString(36).slice(-5);

const getRandomDate = () => +(new Date()) - Math.floor(Math.random() * 10000000000);

const getMixedArray = (array) => array.sort(() => Math.random() - 0.5);

const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomFromRange = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min));
};

module.exports = {
  getRandomString,
  getRandomDate,
  getMixedArray,
  getRandomFromArray,
  getRandomFromRange
};
