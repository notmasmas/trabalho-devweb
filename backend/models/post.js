const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: [true, "Must provide title"]
    },
    "body": {
        type: String,
        required: [true, "Must provide post body"],
        maxlength: [500, "Post cannot be longer than 500"],
    },
    "author": {
        type: String,
        required: [true, "Post must have author"],
    },
    "comments": [
        {
            "user": String,
            "text": String,
            "createdAt": {
                type: Date,
                default: Date.now
            }
        }
    ],
    "tags": {
        type: [String],
        default: []
    },
    "imageSize": {
        type: Number,
        default: 0
    },
    "imageURI": {
        type: String,
        default: ''
    },
    "uploadDate": {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('posts', postSchema);