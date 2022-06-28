const User = require("../models/auth");

const createUserConfig = (input) => {
    const newUser = new User(input);
    return newUser.save();
}

const findOneConfig = (email) => {
    return User.findOne({ email });
}


module.exports = {
    createUserConfig,
    findOneConfig
}