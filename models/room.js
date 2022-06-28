require("dotenv").config()

const { Schema, model } = require("mongoose");


const RoomSchema = new Schema({
    title: {
        type: String,
        required: [true, "please provide title"],
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
},
    { timestamps: true }
);


/**
 * example schema
 * 
 * [
    {number: 101, unavailableDates: [01.05.2022, 02.05.2022]}
    {number: 101, unavailableDates: [01.05.2022, 02.05.2022]}
   ]
 * 
 */



module.exports = model("Room", RoomSchema);