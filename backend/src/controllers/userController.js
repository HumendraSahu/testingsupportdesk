const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');

const checkAnyUser = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  return res
    .status(200)
    .json(new apiResponse(200, { exists: count > 0 }, 'User check successful'));
});

module.exports = {
  checkAnyUser,
};
