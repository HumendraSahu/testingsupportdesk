const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    details: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
