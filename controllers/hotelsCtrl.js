const { StatusCodes } = require("http-status-codes");

const {
    createHotelConfig,
    updateHotelConfig,
    deleteHotelConfig,
    getHotelConfig,
    getHotelsConfig,
    countDocuments

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
    const { min, max, limit, ...others } = req.query;
    const hotels = await getHotelsConfig(others, min, max, limit)
    // const hotels = await getHotelsConfig(req.query, req.query.limit);
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
});

//COUNT HOTEL BY CITY
const countByCity = asyncWrapper(async (req, res) => {

    const cities = req.query.cities.split(",");
    const list = await Promise.all(cities.map(city => {
        return countDocuments(city, "cities")
    }))

    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            list
        })
});

//COUNT HOTEL BY TYPE
const countByType = asyncWrapper(async (req, res) => {
    const id = () => {
        return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
    }

    const hotelCount = await countDocuments("_", "hotel");
    const apartmentCount = await countDocuments("_", "apartment");
    const resortCount = await countDocuments("_", "resort");
    const villaCount = await countDocuments("_", "villa");
    const cabinCount = await countDocuments("_", "cabin");

    res
        .status(StatusCodes.OK)
        .json({
            success: true,
            statusCode: StatusCodes.OK,
            hotels: [
                { type: "hotel", count: hotelCount, id: id() },
                { type: "apartment", count: apartmentCount, id: id() },
                { type: "resort", count: resortCount, id: id() },
                { type: "villa", count: villaCount, id: id() },
                { type: "cabin", count: cabinCount, id: id() }
            ]
        })
});

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType
}