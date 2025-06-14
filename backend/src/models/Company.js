const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    domain: { type: String },
    tier: { type: String },
    healthScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
