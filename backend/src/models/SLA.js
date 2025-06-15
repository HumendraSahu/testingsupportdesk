const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const SLASchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

SLASchema.plugin(mongoosePaginate);

module.exports = mongoose.model('SLA', SLASchema);
