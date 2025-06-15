const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    // The contact on whose behalf this ticket was created. When a contact
    // creates a ticket themselves this will reference that user. If an
    // admin or agent creates the ticket on behalf of a contact, the contact
    // field should reference that contact's user record.
    contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Basic ticket information
    subject: { type: String, required: true },

    // Ticket type describes whether it is a problem, request or refund
    type: {
      type: String,
      enum: ['problem', 'request', 'refund'],
    },

    source: String,

    priority: String,

    // Current ticket status
    status: {
      type: String,
      enum: ['open', 'closed', 'on hold'],
      default: 'open',
    },

    // Groups to which this ticket belongs
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],

    // Assigned agent
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    product: String,
    description: String,

    referenceNumber: { type: String, unique: true },

    tags: [String],

    // User who actually created the ticket (admin, agent or contact)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', TicketSchema);
