const mongoose = require('mongoose');

const SLASchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    responseTime: { type: Number, required: true }, // hours
    resolutionTime: { type: Number, required: true }, // hours
  },
  { timestamps: true }
);

module.exports = mongoose.model('SLA', SLASchema);
