const User = require('../../models/User');
const apiResponse = require('../../utils/apiResponse');

exports.registerAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, email, company, phone } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existing = await User.aggregate([
      { $match: { email: normalizedEmail } },
      { $project: { _id: 1 } },
    ]);

    if (existing.length > 0) {
      return res
        .status(400)
        .json(new apiResponse(400, null, 'Email already exists'));
    }

    const newUser = new User({
      role: 'admin',
      firstName,
      lastName,
      company,
      phone,
      email: normalizedEmail,
    });

    await newUser.save();
    return res
      .status(201)
      .json(new apiResponse(201, newUser, 'Admin registered successfully'));
  } catch (err) {
    next(err);
  }
};

exports.registerContact = async (req, res, next) => {
  try {
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
      return res
        .status(400)
        .json(new apiResponse(400, null, 'Email already exists'));
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
    return res
      .status(201)
      .json(new apiResponse(201, newUser, 'Contact registered successfully'));
  } catch (err) {
    next(err);
  }
};

exports.registerAgent = async (req, res, next) => {
  try {
    const {
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
      return res
        .status(400)
        .json(new apiResponse(400, null, 'Email already exists'));
    }

    const newUser = new User({
      role: 'agent',
      email: normalizedEmail,
      agentType,
      availability,
      timezone,
      signature,
      groups,
    });

    await newUser.save();
    return res
      .status(201)
      .json(new apiResponse(201, newUser, 'Agent registered successfully'));
  } catch (err) {
    next(err);
  }
};
