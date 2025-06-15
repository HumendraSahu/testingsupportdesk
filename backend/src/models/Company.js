const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    domain: String,
    healthScore: {
      type: String,
      enum: ['at risk', 'doing okay', 'loss'],
    },
    accountTier: String,
    industryType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
