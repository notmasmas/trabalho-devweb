const express = require('express');
const {getAllFiles, createFile, deleteFile, editFile, downloadFile} = require('../controllers/file');
const router = express.Router();
const upload = require('../middleware/upload');

router.route('/')
    .get(getAllFiles)
    .post(upload.single('file'), createFile);

router.route('/:id')
    .delete(deleteFile)
    .patch(editFile);

router.route('/:id/download')
    .get(downloadFile);

module.exports = router;