const oneOf = (choices) => ({
  assert(option) {
    return choices.indexOf(option) >= 0;
  },
  message: `должно быть одним из [${choices}]`
});

const someOf = (choices) => ({
  assert(options) {
    const assertion = oneOf(choices);
    return options.every((it) => assertion.assert(it));
  },
  message: `должно содержать какие-либо значения из [${choices}]`
});

const inRange = (from, to) => ({
  assert(number) {
    return number >= from && number <= to;
  },
  message: `должно находиться в диапазоне от ${from} до ${to}`
});

const inTextRange = (from, to) => ({
  assert(text) {
    return text.length >= from && text.length <= to;
  },
  message: `должно содержать от ${from} до ${to} символов`
});

const isNumeric = () => ({
  assert(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  },
  message: `должно быть числом`
});

const isImage = () => ({
  assert(image) {
    return image.mimetype.startsWith(`image/`);
  },
  message: `должно быть изображением`
});

const isArrayOfImages = () => ({
  assert(array) {
    const assertion = isImage();
    return array.every((it) => assertion.assert(it));
  },
  message: `должно содержать только изображения`
});

const isUniqueArray = () => ({
  assert(options) {
    const set = new Set(options);
    return set.size === options.length;
  },
  message: `не должно содержать повторяющихся значений`
});

module.exports = {
  oneOf,
  someOf,
  inRange,
  inTextRange,
  isNumeric,
  isImage,
  isArrayOfImages,
  isUniqueArray
};
