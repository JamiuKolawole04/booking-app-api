const { StatusCodes } = require("http-status-codes");

const {
    createHotelConfig,
    updateHotelConfig,
    deleteHotelConfig,
    getHotelConfig,
    getHotelsConfig

} = require("../config/hotelConfig");
const asyncWrapper = require("../middleware/async-wrapper");
// const { UnauthenticatedError, BadRequestError, NotFoundError } = require("../errors/index")

// CREATE HOTEL
const createHotel = asyncWrapper(async (req, res) => {
    const hotel = await createHotelConfig(req.body);
    res
        .status(StatusCodes.CREATED)
        .json({
            statusCode: StatusCodes.CREATED,
            success: true,
            hotel
        })
});


// GET SINGLE HOTEL
const getHotel = asyncWrapper(async (req, res, next) => {
    const hotel = await getHotelConfig(req.params.id);

    res
        .status(StatusCodes.OK)
        .json({
            statusCode: StatusCodes.OK,
            success: true,
            hotel

        })
});

//GET ALL HOTELS
const getHotels = asyncWrapper(async (req, res) => {
    const hotels = await getHotelsConfig();
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            nbHits: hotels.length,
            hotels
        })
});


// UPDATE HOTEL
const updateHotel = asyncWrapper(async (req, res) => {
    const updateHotel = await updateHotelConfig(req.params.id, req.body);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            updateHotel
        })

})


//DELETE HOTEL
const deleteHotel = asyncWrapper(async (req, res) => {
    await deleteHotelConfig(req.params.id);
    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            msg: "Hotel has been deleted."
        })
})


module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels
}