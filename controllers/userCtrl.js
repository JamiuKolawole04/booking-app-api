const { StatusCodes } = require("http-status-codes");

const {
    updateUserConfig,
    deleteUserConfig,
    getUserConfig,
    getUsersConfig

} = require("../config/userConfig");
const asyncWrapper = require("../middleware/async-wrapper");
// const { UnauthenticatedError, BadRequestError, NotFoundError } = require("../errors/index")



// GET SINGLE USER
const getUser = asyncWrapper(async (req, res, next) => {
    const user = await getUserConfig(req.params.id);

    res
        .status(StatusCodes.OK)
        .json({
            statusCode: StatusCodes.OK,
            success: true,
            user

        })
});

//GET ALL USERS
const getUsers = asyncWrapper(async (req, res) => {
    const users = await getUsersConfig();
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            nbHits: users.length,
            users
        })
});


// UPDATE USER
const updateUser = asyncWrapper(async (req, res) => {
    const updatedUser = await updateUserConfig(req.params.id, req.body);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            updatedUser
        })

})


//DELETE USER
const deleteUser = asyncWrapper(async (req, res) => {
    await deleteUserConfig(req.params.id);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            msg: "User has been deleted."
        })
})


module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}