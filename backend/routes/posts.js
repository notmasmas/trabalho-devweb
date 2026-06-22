const express = require('express');
const {getAllPosts, createPost, getPost, deletePost, editPost} = require('../controllers/post');
const router = express.Router();

router.route('/')
    .get(getAllPosts)
    .post(createPost);

router.route('/:id')
    .get(getPost)
    .delete(deletePost)
    .patch(editPost);

module.exports = router;