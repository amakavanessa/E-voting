class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
