function log(action, userId, articleId) {
  console.log(`[KB] ${action} article ${articleId} by user ${userId}`);
}

module.exports = { log };
