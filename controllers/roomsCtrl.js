const { StatusCodes } = require("http-status-codes");

const asyncWrapper = require("../middleware/async-wrapper");
const {
    createRoomConfig,
    updateRoomConfig,
    deleteRoomConfig,
    getRoomConfig,
    getRoomsConfig,
    updateOneRoomConfig
} = require("../config/roomsConfig");
const Hotel = require("../models/hotel");
const { BadRequestError } = require("../errors")


const createRoom = asyncWrapper(async (req, res, next) => {
    // getting id from already created hotels
    const hotelId = req.params.hotelid;
    const savedRoom = await createRoomConfig(req.body)


    try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
        });

    } catch (err) {
        return next(err)
    }

    res
        .status(StatusCodes.CREATED)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            savedRoom
        })

});

// GET SINGLE ROOM
const getRoom = asyncWrapper(async (req, res) => {
    const room = await getRoomConfig(req.params.id);

    res
        .status(StatusCodes.OK)
        .json({
            statusCode: StatusCodes.OK,
            success: true,
            room

        })
});

//GET ALL ROOMS
const getRooms = asyncWrapper(async (req, res) => {
    const rooms = await getRoomsConfig();
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            nbHits: rooms.length,
            rooms
        })
});


// UPDATE ROOM
const updateRoom = asyncWrapper(async (req, res) => {
    const updatedRoom = await updateRoomConfig(req.params.id, req.body);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            updatedRoom
        })

});

// UPDATE ROOM AVAILABILITY
const updateRoomAvailability = asyncWrapper(async (req, res, next) => {
    const { date } = req.body;
    const { id } = req.params;

    if (!date || !id) {
        return next(BadRequestError("could not update room"));
    }

    await updateOneRoomConfig(id, date);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            msg: "Room status has been updated"
        })

});


//DELETE ROOM
const deleteRoom = asyncWrapper(async (req, res, next) => {
    const hotelId = req.params.hotelid;
    await deleteRoomConfig(req.params.id);

    try {
        await Hotel.findByIdAndUpdate(hotelId, {
            $pull: { rooms: req.params.id },
        });
    } catch (err) {
        return next(err)
    }
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            msg: "Room has been deleted."
        })
})




module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoomAvailability
}