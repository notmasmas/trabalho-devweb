const StatusCodes = require('http-status-codes');
const Post = require('../models/post');
const {BadRequestError, NotFoundError, CustomAPIError} = require('../errors');

const getAllPosts = async (req, res) => {

    let posts = await Post.find({});

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = posts.skip(skip).limit(limit);

    const posts = await result;
    
    res
        .status(StatusCodes.OK)
        .json(posts)
}

const createPost = async (req, res) => {
    const post = await Post.create(req.body);

    req
        .status(StatusCodes.CREATED)
        .send();
}

const getPost = async (req, res) => {

    const {id:postID} = req.params;

    const post = await Post.find({_id: postID});

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    res
        .status(StatusCodes.OK)
        .json(post);
}

const deletePost = async (req, res) => {

    const {id:postID} = req.params;
    const post = await Post.findOneAndDelete({_id:postID});

    if (!post) {
        throw new NotFoundError('Post not found');
    }

    res
        .status(StatusCodes.OK)
        .send();
}

const editPost = async (req, res) => {

    const {id:postID} = req.params;
    const post = await Post.findOneAndUpdate({_id: postID}, req.body, {returnDocument: 'after'});

    if (!post) {
        return new NotFoundError('Post not found');
    }

    res
        .status(StatusCodes.OK)
        .send();
}

module.exports = {
    getAllPosts,
    createPost,
    getPost,
    deletePost,
    editPost
};