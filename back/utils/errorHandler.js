module.exports = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.statusCode < 500 ? 'Bad request' : 'Internal Server Error',
    message: error.message,
    info: error.errorStack,
  });
};
