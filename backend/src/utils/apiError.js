class apiError extends Error {
  constructor(statusCode, message = 'error', errors = null) {
    super(message);
    this.statusCode = statusCode;
    if (errors) {
      this.errors = errors;
    }
  }
}

module.exports = apiError;
