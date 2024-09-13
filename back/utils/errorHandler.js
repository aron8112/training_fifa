const errorCatcher = (req, res, next) => {
  res.status(400).json({
    error: error.data,
  });
};
