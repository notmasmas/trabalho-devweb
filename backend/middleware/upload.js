const multer = require('multer');

const storage = multer.diskStorage({
    destination: './uploads/files',
    filename: (req, file, cb) => {
        const uniqueName = Date.now();
        cb(null, uniqueName + '-' + file.originalname);
    }
});

const upload = multer({storage});

module.exports = upload;