const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    timezone: { type: String },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
