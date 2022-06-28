const router = require("express").Router();

const {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels

} = require("../controllers/hotelsCtrl");
const { verifyAdmin } = require("../utils/jwt");

// CREATE HOTEL
// GET ALL HOTELS

router.route("/")
    .post(verifyAdmin, createHotel)
    .get(getHotels)

// GET HOTEL
// UPDATE HOTEL
//DELETE HOTEL

router.route("/:id")
    .get(getHotel)
    .put(verifyAdmin, updateHotel)
    .delete(verifyAdmin, deleteHotel)


module.exports = router;