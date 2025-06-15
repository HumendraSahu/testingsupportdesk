const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['admin', 'contact', 'agent'],
      required: true,
    },
    // common fields
    email: { type: String, required: true },

    // Admin specific
    firstName: String,
    lastName: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    phone: String,

    // Contact/Agent specific
    fullName: {
      type: String,
      required: function () {
        return this.role === 'agent' || this.role === 'contact';
      },
    },
    address: String,
    timezone: String,
    tags: [String],
    language: String,

    // Agent specific
    // fullName and email fields are also applicable to agents
    agentType: {
      type: String,
      enum: ['collaborator', 'support'],
    },
    availability: {
      type: String,
      enum: ['full-time', 'occasional'],
    },
    signature: String,
    groups: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
