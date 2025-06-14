const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String },
    healthScore: { type: Number, default: 100 },
    tier: { type: String },
    industry: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
