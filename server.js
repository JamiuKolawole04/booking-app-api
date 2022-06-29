require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const cookieParser = require("cookie-parser")

const db = require("./db/db");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler")

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


//ROUTES
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/hotels", hotelsRoute);
app.use("/api/v1/rooms", roomsRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        msg: "Server on!"
    });
});


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const server = async () => {
    try {
        await db(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`)
        });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

server();

