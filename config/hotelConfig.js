const Hotels = require("../models/hotel");

const createHotelConfig = async (input) => {
    const newHotel = new Hotels(input);
    return newHotel.save();
}

const updateHotelConfig = (id, data) => {
    return Hotels.findByIdAndUpdate(id,
        {
            $set: data
        },
        {
            new: true
        }
    )
}

const deleteHotelConfig = (id) => {
    return Hotels.findByIdAndDelete(id);
}

const getHotelConfig = (id) => {
    return Hotels.findOne({ _id: id })
}

const getHotelsConfig = () => {
    return Hotels.find({});
}

module.exports = {
    createHotelConfig,
    updateHotelConfig,
    deleteHotelConfig,
    getHotelConfig,
    getHotelsConfig
}