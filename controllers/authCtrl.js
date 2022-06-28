const { StatusCodes } = require("http-status-codes");

const { UnauthenticatedError, BadRequestError } = require("../errors/");
const { createUserConfig, findOneConfig } = require("../config/authConfig");
const asyncWrapper = require("../middleware/async-wrapper");

const register = asyncWrapper(async (req, res, next) => {
    const { password, username, email } = req.body;
    if (!password || !username || !email) return next(BadRequestError("email, username and password are required"));
    let user = await findOneConfig(email);
    if (user) return next(BadRequestError("Email aleady exists"))
    user = await createUserConfig({
        ...req.body
    });
    if (user) {
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: "user created" })
    }
})


const login = asyncWrapper(async (req, res, next) => {
    var { email, password } = req.body;
    if (!email || !password) {
        return next(BadRequestError("email and password are required"))
    }
    const user = await findOneConfig(email);
    if (!user || !(await user.comparePassword(password))) {
        return next(UnauthenticatedError("Invalid credentials"))
    }
    var { password, isAdmin, ...otherDetails } = user._doc;

    const token = user.createJWT();

    res
        .cookie("access_token", token, {
            httpOnly: true
        })
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            msg: "Log in success",
            otherDetails
        })

}

)


module.exports = {
    register,
    login
}