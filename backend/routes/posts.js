const express = require('express');
const {getAllPosts, createPost, getPost, deletePost, editPost, createComment} = require('../controllers/post');
const router = express.Router();
const upload = require('../middleware/upload');

router.route('/')
    .get(getAllPosts)
    .post(upload.single('file'), createPost);

router.route('/:id')
    .get(getPost)
    .delete(deletePost)
    .patch(editPost);

router.route('/comments/:id')
    .post(createComment);

module.exports = router;