const apiError = require('../utils/apiError');
const apiResponse = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  if (err instanceof apiError) {
    return res
      .status(err.statusCode)
      .json(new apiResponse(err.statusCode, err.errors, err.message));
  }

  console.error(err);
  return res
    .status(500)
    .json(new apiResponse(500, null, 'Internal Server Error'));
}

module.exports = errorHandler;
