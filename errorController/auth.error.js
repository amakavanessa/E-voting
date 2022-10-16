const CustomError = require('./customError');
class AuthError extends CustomError {
  statusCode = 400;

  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = AuthError;
