class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('5') ? 'fail' : 'error';

    return this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ErrorHandler;
