const express = require("express");
const db = require("./connection/db");
const { ERROR } = require("./utils/status.code.text");
require("dotenv").config();
const app = express();
app.use(express.json());
const PORT = parseInt(process.env.PORT) || 5000;
// conection with database
db();
// server started
// global middle ware for expected errors
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || ERROR,
        data: error.data || null,
        message: error.message || "",
        code: error.statusCode || 500,
    })
})
app.listen(PORT, () => {
    console.log("Server Started on", PORT);
})