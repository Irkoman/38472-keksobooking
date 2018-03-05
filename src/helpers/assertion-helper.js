module.exports = {
  isNumeric() {
    return {
      assert(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },
      message: `должно быть числом`
    };
  }
};
