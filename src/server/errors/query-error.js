module.exports = class QueryError extends Error {
  constructor(errors) {
    super();
    this.name = `Некорректный запрос`;
    this.errors = errors;
  }
};
