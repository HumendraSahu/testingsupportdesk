const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const { createToken } = require('../services/tokenService');
const { hashPassword } = require('../services/passwordService');

const registerAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, company, phone, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existing = await User.aggregate([
    { $match: { email: normalizedEmail } },
    { $project: { _id: 1 } },
  ]);

  if (existing.length > 0) {
    throw new apiError(400, 'Email already exists');
  }

  const newUser = new User({
    role: 'admin',
    firstName,
    lastName,
    company,
    phone,
    email: normalizedEmail,
    password: hashPassword(password),
  });

  await newUser.save();
  const token = createToken({ id: newUser._id, role: newUser.role });

  return res
    .status(201)
    .json(new apiResponse(201, { user: newUser, token }, 'Admin registered successfully'));
});

const registerContact = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phone,
    company,
    address,
    timezone,
    tags,
    language,
  } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existing = await User.aggregate([
    { $match: { email: normalizedEmail } },
    { $project: { _id: 1 } },
  ]);

  if (existing.length > 0) {
    throw new apiError(400, 'Email already exists');
  }

  const newUser = new User({
    role: 'contact',
    fullName,
    email: normalizedEmail,
    phone,
    company,
    address,
    timezone,
    tags,
    language,
  });

  await newUser.save();

  const token = createToken({ id: newUser._id, role: newUser.role });

  return res
    .status(201)
    .json(new apiResponse(201, { user: newUser, token }, 'Contact registered successfully'));
});

const registerAgent = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    agentType,
    availability,
    timezone,
    signature,
    groups,
  } = req.body;
  const normalizedEmail = email.toLowerCase();

  const existing = await User.aggregate([
    { $match: { email: normalizedEmail } },
    { $project: { _id: 1 } },
  ]);

  if (existing.length > 0) {
    throw new apiError(400, 'Email already exists');
  }

  const newUser = new User({
    role: 'agent',
    fullName,
    email: normalizedEmail,
    agentType,
    availability,
    timezone,
    signature,
    groups,
  });

  await newUser.save();

  const token = createToken({ id: newUser._id, role: newUser.role });

  return res
    .status(201)
    .json(new apiResponse(201, { user: newUser, token }, 'Agent registered successfully'));
});

module.exports = {
  registerAdmin,
  registerContact,
  registerAgent,
};
