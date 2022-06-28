const Room = require("../models/room");


const createRoomConfig = (input) => {
    const newRoom = new Room(input);
    return newRoom.save();
}

const updateRoomConfig = (id, data) => {
    return Room.findByIdAndUpdate(id,
        {
            $set: data
        },
        {
            new: true
        }
    )
}

const getRoomConfig = (id) => {
    return Room.findOne({ _id: id })
}

const getRoomsConfig = () => {
    return Room.find({});
}

const deleteRoomConfig = (id) => {
    return Room.findByIdAndDelete(id);
}


module.exports = {
    createRoomConfig,
    updateRoomConfig,
    getRoomConfig,
    getRoomsConfig,
    deleteRoomConfig
}