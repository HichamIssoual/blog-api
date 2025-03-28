require("dotenv").config();
const express = require("express");
const db = require("./connection/db");
const { ERROR, FAIL } = require("./utils/status.code.text");
const cors = require("cors");
const app = express();
const PORT = parseInt(process.env.PORT) || 5000;
// body parser
app.use(express.json());
// CORS: Server says who can get its data.
app.use(cors());
// conection with db
db();
// routes 
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users",require("./routes/users.routes"));
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
// server has on started
app.listen(PORT, () => {
    console.log("Server Started on", PORT);
})