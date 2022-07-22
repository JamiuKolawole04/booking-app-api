const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const verifyToken = async (req, res, next) => {
  const token = await req.session.name;
  if (!token) return next(UnauthenticatedError("please login or register"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(UnauthenticatedError("Invalid token"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user === undefined) {
      return next(UnauthenticatedError("please login or register"));
    }
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(UnauthenticatedError("You are not authorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user === undefined) {
      return next(UnauthenticatedError("please login or register"));
    }
    if (req.user.isAdmin) {
      next();
    } else {
      return next(UnauthenticatedError("You are not an admin"));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
