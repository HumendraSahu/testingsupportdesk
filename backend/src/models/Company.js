const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

CompanySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Company', CompanySchema);
