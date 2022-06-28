const Users = require("../models/auth");

const updateUserConfig = (id, data) => {
    return Users.findByIdAndUpdate(id,
        {
            $set: data
        },
        {
            new: true
        }
    )
}

const deleteUserConfig = (id) => {
    return Users.findByIdAndDelete(id);
}

const getUserConfig = (id) => {
    return Users.findOne({ _id: id })
}

const getUsersConfig = () => {
    return Users.find({});
}

module.exports = {
    updateUserConfig,
    deleteUserConfig,
    getUserConfig,
    getUsersConfig
}