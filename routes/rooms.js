const router = require("express").Router();

const {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms
} = require("../controllers/roomsCtrl");



const { verifyAdmin } = require("../utils/jwt");

// CREATE HOTEL
// GET ALL HOTELS

router.post("/:hotelid", verifyAdmin, createRoom);
router.get("/", getRooms);

// GET ROOM
// UPDATE ROOM

router.route("/:id")
    .get(getRoom)
    .put(verifyAdmin, updateRoom)


// DELETE ROOM    
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);


module.exports = router;


module.exports = router;