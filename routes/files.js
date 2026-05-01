const express = require('express');
const {getAllFiles, createFile, deleteFile, editFile} = require('../controllers/file');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});

router.route('/')
    .get(getAllFiles)
    .post(upload.single('file'), createFile);

router.route('/:id')
    .delete(deleteFile)
    .patch(editFile);

module.exports = router;