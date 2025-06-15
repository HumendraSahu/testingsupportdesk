const KBArticle = require('../models/KBArticle');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const logger = require('../services/logger');

const createArticle = asyncHandler(async (req, res) => {
  const { title, content, category, tags, isPublic } = req.body;
  const article = new KBArticle({
    title,
    content,
    category,
    tags,
    isPublic,
    createdBy: req.user.id,
  });
  await article.save();
  logger.log('create', req.user.id, article._id);
  return res
    .status(201)
    .json(new apiResponse(201, { article }, 'Article created successfully'));
});

const getAllArticles = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (category) {
    filter.category = category;
  }
  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { content: new RegExp(search, 'i') },
    ];
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: { createdAt: -1 },
  };
  const result = await KBArticle.paginate(filter, options);
  const data = {
    articles: result.docs,
    pagination: {
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      page: result.page,
      limit: result.limit,
    },
  };
  return res.status(200).json(new apiResponse(200, data));
});

const getArticleById = asyncHandler(async (req, res) => {
  const article = await KBArticle.findById(req.params.id);
  if (!article) {
    throw new apiError(404, 'Article not found');
  }
  return res.status(200).json(new apiResponse(200, { article }));
});

const updateArticle = asyncHandler(async (req, res) => {
  const { title, content, category, tags, isPublic } = req.body;
  const article = await KBArticle.findById(req.params.id);
  if (!article) {
    throw new apiError(404, 'Article not found');
  }
  if (title !== undefined) article.title = title;
  if (content !== undefined) article.content = content;
  if (category !== undefined) article.category = category;
  if (tags !== undefined) article.tags = tags;
  if (isPublic !== undefined) article.isPublic = isPublic;
  await article.save();
  logger.log('update', req.user.id, article._id);
  return res
    .status(200)
    .json(new apiResponse(200, { article }, 'Article updated successfully'));
});

const deleteArticle = asyncHandler(async (req, res) => {
  const article = await KBArticle.findById(req.params.id);
  if (!article) {
    throw new apiError(404, 'Article not found');
  }
  await article.remove();
  logger.log('delete', req.user.id, article._id);
  return res
    .status(200)
    .json(new apiResponse(200, null, 'Article deleted successfully'));
});

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
