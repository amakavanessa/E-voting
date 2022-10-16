class CustomError extends Error {
  statusCode = 0;

  constructor(message) {
    super(message);
    //needed when you are extending a built in class in javascript
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    [];
  }
}
module.exports = CustomError;
