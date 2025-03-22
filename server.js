require("dotenv").config();
const express = require("express");
const db = require("./connection/db");
const { ERROR, FAIL } = require("./utils/status.code.text");
const cors = require("cors");
const app = express();
const PORT = parseInt(process.env.PORT) || 5000;
const userRouter = require("./routes/users.routes");
// body parser
app.use(express.json());
// CORS: Server says who can get its data.
app.use(cors());
// conection with database
db();
// routes 
app.use("/api/auth", userRouter);
// handle unfounded routes
app.use("*", (req, res) => {
    res.status(404).json({
        status: FAIL,
        data: null,
        message: "route not found",
        code: 404,
    })
})
// global middle ware for expected errors
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || ERROR,
        data: error.data || null,
        message: error.message || "",
        code: error.statusCode || 500,
    })
})
// server started
app.listen(PORT, () => {
    console.log("Server Started on", PORT);
})