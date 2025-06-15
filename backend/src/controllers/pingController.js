const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');

const ping = asyncHandler(async (req, res, next) => {
  // Example of using the utilities; no error condition here
  return res
    .status(200)
    .json(new apiResponse(200, { message: 'pong' }, 'Ping successful'));
});

module.exports = {
  ping,
};
