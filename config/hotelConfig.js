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

const getHotelsConfig = (query, min = 1, max = 999, limit) => {
    // return Hotels.find(query).limit(limit);
    return Hotels.find({
        ...query,
        cheapestPrice: { $gt: min, $lt: max },
    }).limit(limit);

}

const countDocuments = (doc, type) => {
    if (type === "cities") {
        return Hotels.countDocuments({ city: doc })
    } else if (type === "hotel") {
        return Hotels.countDocuments({ type: type })
    } else if (type === "apartment") {
        return Hotels.countDocuments({ type: type })
    } else if (type === "resort") {
        return Hotels.countDocuments({ type: type })
    } else if (type === "villa") {
        return Hotels.countDocuments({ type: type })
    } else {
        return Hotels.countDocuments({ type: "cabin" })
    }
    // return Hotels.countDocuments({ city: city })
}

module.exports = {
    createHotelConfig,
    updateHotelConfig,
    deleteHotelConfig,
    getHotelConfig,
    getHotelsConfig,
    countDocuments
}