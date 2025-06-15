const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const { createToken } = require('../services/tokenService');
const { comparePassword } = require('../services/passwordService');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user) {
    throw new apiError(401, 'Invalid credentials');
  }
  if (!comparePassword(password, user.password)) {
    throw new apiError(401, 'Invalid credentials');
  }
  const token = createToken({ id: user._id, role: user.role });
  return res
    .status(200)
    .json(new apiResponse(200, { user, token }, 'Login successful'));
});

module.exports = { login };
