const multer = require("multer");

module.exports = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 30 * 1024 * 1024
    },
    fileFilter(req, file, cb) {
        if (file.mimetype !== "application/pdf") {
            return cb(new Error("Somente PDFs são permitidos."));
        }

        cb(null, true);
    }
});