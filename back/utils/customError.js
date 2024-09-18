module.exports = class CustomError extends Error {
  constructor(message, statusCode, errorStack) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errorStack = errorStack || null;
  }
};
