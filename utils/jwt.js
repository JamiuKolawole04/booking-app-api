const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(UnauthenticatedError("You are not authenticated"))

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(UnauthenticatedError("Invalid token"));
        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return next(UnauthenticatedError("You are not authorized"))
        }
    })
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(UnauthenticatedError("You are not an admin"))
        }
    })
}


module.exports = {
    verifyToken,
    verifyUser,
    verifyAdmin
}