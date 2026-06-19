const express = require('express');
const {getAllProjects, createProject, getProject, deleteProject, editProject};
const router = express.Router();
const upload = require('../middleware/upload');

router.route('/')
    .get(getAllProjects)
    .post(upload.single('file'), createProject);

router.route('/:id')
    .get(getProject)
    .delete(deleteProject)
    .patch(editProject);

module.exports = router;