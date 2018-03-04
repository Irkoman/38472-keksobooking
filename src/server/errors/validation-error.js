module.exports = class ValidationError extends Error {
  constructor(errors) {
    super();
    this.name = `Некорректные данные`;
    this.errors = errors;
  }
};
