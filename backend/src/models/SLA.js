const mongoose = require('mongoose');

const SLASchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SLA', SLASchema);
