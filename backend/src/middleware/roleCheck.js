// Role-based access control middleware placeholder
function roleCheck(roles = []) {
  return (req, res, next) => {
    // TODO: check if user has one of the required roles
    next();
  };
}

module.exports = roleCheck;
