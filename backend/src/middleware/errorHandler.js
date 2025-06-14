// Global error handler middleware placeholder
function errorHandler(err, req, res, next) {
  // TODO: handle errors globally
  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
