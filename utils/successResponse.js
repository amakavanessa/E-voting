module.exports = (data, token, res) => {
  if (!token) {
    return res.status(200).json({
      status: 'success',
      data,
    });
  }
  return res.status(200).json({
    status: 'success',
    data,
    token,
  });
};
