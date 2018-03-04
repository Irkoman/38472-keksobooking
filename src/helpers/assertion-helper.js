const oneOf = (choices) => {
  return {
    assert(option) {
      return choices.indexOf(option) >= 0;
    },
    message: `должно быть одним из [${choices}]`
  };
};

const isImage = () => {
  return {
    assert(image) {
      return image.mimetype.startsWith(`image/`);
    },
    message: `должно быть изображением`
  };
};

module.exports = {
  oneOf,
  someOf(choices) {
    return {
      assert(options) {
        const assertion = oneOf(choices);
        return options.every((it) => assertion.assert(it));
      },
      message: `должно содержать какие-либо значения из [${choices}]`
    };
  },
  inRange(from, to) {
    return {
      assert(number) {
        return number >= from && number <= to;
      },
      message: `должно находиться в диапазоне от ${from} до ${to}`
    };
  },
  inTextRange(from, to) {
    return {
      assert(text) {
        return text.length >= from && text.length <= to;
      },
      message: `должно содержать от ${from} до ${to} символов`
    };
  },
  isNumeric() {
    return {
      assert(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },
      message: `должно быть числом`
    };
  },
  isImage,
  isSetOfImages() {
    return {
      assert(images) {
        const assertion = isImage();
        return images.every((it) => assertion.assert(it));
      },
      message: `должно содержать только изображения`
    };
  },
  isUnique() {
    return {
      assert(options) {
        const set = new Set(options);
        return set.size === options.length;
      },
      message: `не должно содержать повторяющихся значений`
    };
  }
};
