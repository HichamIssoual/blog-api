const path = require("path")
const multer = require("multer");
// photoStrorage
const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (req, file, cb) => {
        if (file) {
            cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`)
        } else {
            cb(null, false);
        }
    }
});
// phot upload middleware
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: (req, file, cb) => {
        // mimetype return like this => image/jpeg
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb({ message: "must enter image" }, false)
        }
    },
    limits: { fileSize: (1024 * 1024) * 3 } // 3 migabyte
})
module.exports = photoUpload;