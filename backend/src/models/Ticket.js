const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
