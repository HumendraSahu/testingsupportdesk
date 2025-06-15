const KBArticle = require('../models/KBArticle');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const logger = require('../services/logger');
const { redisClient } = require('../db/redis');

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
  await redisClient.set(
    `kbArticle:${article._id}`,
    JSON.stringify(article),
    {
      EX: 3600,
    }
  );
  logger.log('create', req.user.id, article._id);
  return res
    .status(201)
    .json(new apiResponse(201, { article }, 'Article created successfully'));
});

const getAllArticles = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
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
  const cacheKey = `kbArticles:${category || 'all'}:${search || ''}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    const articles = JSON.parse(cached);
    return res.status(200).json(new apiResponse(200, { articles }));
  }
  const articles = await KBArticle.find(filter);
  await redisClient.set(cacheKey, JSON.stringify(articles), { EX: 3600 });
  return res.status(200).json(new apiResponse(200, { articles }));
});

const getArticleById = asyncHandler(async (req, res) => {
  const cacheKey = `kbArticle:${req.params.id}`;
  const cached = await redisClient.get(cacheKey);
  if (cached) {
    const article = JSON.parse(cached);
    return res.status(200).json(new apiResponse(200, { article }));
  }

  const article = await KBArticle.findById(req.params.id);
  if (!article) {
    throw new apiError(404, 'Article not found');
  }
  await redisClient.set(cacheKey, JSON.stringify(article), { EX: 3600 });
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
  await redisClient.set(
    `kbArticle:${article._id}`,
    JSON.stringify(article),
    { EX: 3600 }
  );
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
  await redisClient.del(`kbArticle:${article._id}`);
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
