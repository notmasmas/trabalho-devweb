const express = require('express');
const {getAllFiles, createFile, deleteFile, editFile} = require('../controllers/file');
const router = express.Router();

router.route('/')
    .get(getAllFiles)
    .post(createFile);

router.route('/:id')
    .delete(deleteFile)
    .patch(editFile);

module.exports = router;