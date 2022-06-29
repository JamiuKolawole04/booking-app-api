const router = require("express").Router();

const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
    countByType

} = require("../controllers/hotelsCtrl");
const { verifyAdmin } = require("../utils/jwt");


// CREATE HOTEL
// GET ALL HOTELS
router.route("/")
    .post(verifyAdmin, createHotel)
    .get(getHotels)


// GET HOTELS BY CITY    
router.get("/countByCity", countByCity);
// GET HOTELS BT TYPE
router.get("/countByType", countByType)


// GET HOTEL
// UPDATE HOTEL
//DELETE HOTEL
router.route("/:id")
    .get(getHotel)
    .put(verifyAdmin, updateHotel)
    .delete(verifyAdmin, deleteHotel)

module.exports = router;