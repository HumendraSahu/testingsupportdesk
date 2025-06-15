const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const KBArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: String,
    tags: [String],
    isPublic: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

KBArticleSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('KBArticle', KBArticleSchema);
