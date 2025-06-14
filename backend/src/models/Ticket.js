const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    tags: [String],
    reference: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
