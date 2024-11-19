let isAdminAuthenticate = (req, res, next) => {
  if (!req.session.AdminId) {
    return res.status(401).json({ unAuthorize: "You have to login first" });
  }
  return next();
};

module.exports = isAdminAuthenticate;
