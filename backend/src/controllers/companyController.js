const Company = require('../models/Company');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const { redisClient } = require('../db/redis');

const addCompany = asyncHandler(async (req, res) => {
  const { name, description, domain, healthScore, accountTier, industryType } = req.body;
  const normalizedDomain = domain ? domain.toLowerCase() : '';
  const cacheKey = normalizedDomain ? `company:${normalizedDomain}` : '';

  if (cacheKey && (await redisClient.get(cacheKey))) {
    throw new apiError(400, 'Company already exists');
  }

  const existing = await Company.aggregate([
    { $match: { domain: normalizedDomain } },
    { $project: { _id: 1 } },
  ]);

  if (existing.length > 0) {
    if (cacheKey) {
      await redisClient.set(cacheKey, '1');
    }
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
  if (cacheKey) {
    await redisClient.set(cacheKey, '1');
  }

  return res
    .status(201)
    .json(new apiResponse(201, { company: newCompany }, 'Company added successfully'));
});

module.exports = {
  addCompany,
};
