const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const GroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

GroupSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Group', GroupSchema);
