module.exports = class NotFoundError extends Error {
  constructor(message) {
    super();
    this.code = 404;
    this.name = `Не найдено`;
    this.message = message;
  }
};
