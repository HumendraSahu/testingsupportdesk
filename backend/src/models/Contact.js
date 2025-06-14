const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    status: { type: String, enum: ['active', 'blocked', 'deleted'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
