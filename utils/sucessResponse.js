module.exports = (data, token, res) => {
  return res.status(200).json({
    status: 'success',
    data,
    token,
  });
};
