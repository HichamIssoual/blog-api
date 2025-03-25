const mongoose = require("mongoose");
const errorGenerator = require("../utils/error.generator");
const { ERROR } = require("../utils/status.code.text");
module.exports = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        const err = errorGenerator.generate(400, ERROR, "invalid user id");
        return next(err);
    }
    next();
}