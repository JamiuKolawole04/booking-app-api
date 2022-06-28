const router = require("express").Router();

const {
    updateUser,
    deleteUser,
    getUser,
    getUsers

} = require("../controllers/userCtrl");
const { verifyUser, verifyAdmin } = require("../utils/jwt");

router.route("/")
    .get(verifyAdmin, getUsers)

// GET USER
// UPDATE USER
//DELETE USER

router.route("/:id")
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .delete(verifyUser, deleteUser)


module.exports = router;