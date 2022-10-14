exports.successRes = (statusCode, data, message) => {
  if (statusCode.startsWith('4')) {
    this.stats = 'fail';
  } else if (statusCode.startsWith('2')) {
    this.stats = 'sucess';
  } else {
    this.stats = 'internal Server error';
  }

  return `
    status: this.stats,
    data: ${data},
    message:${message}
    `;
};
