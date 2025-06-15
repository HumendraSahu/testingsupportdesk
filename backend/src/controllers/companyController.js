const Company = require('../models/Company');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');

const addCompany = asyncHandler(async (req, res) => {
  const { name, description, domain, healthScore, accountTier, industryType } = req.body;
  const normalizedDomain = domain ? domain.toLowerCase() : '';

  const existing = await Company.aggregate([
    { $match: { domain: normalizedDomain } },
    { $project: { _id: 1 } },
  ]);

  if (existing.length > 0) {
    throw new apiError(400, 'Company already exists');
  }

  const newCompany = new Company({
    name,
    description,
    domain: normalizedDomain,
    healthScore,
    accountTier,
    industryType,
  });

  await newCompany.save();

  return res
    .status(201)
    .json(new apiResponse(201, { company: newCompany }, 'Company added successfully'));
});

module.exports = {
  addCompany,
};
