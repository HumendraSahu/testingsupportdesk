const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    contact: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    type: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    product: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: ['open', 'pending', 'resolved', 'closed'],
      default: 'open',
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
