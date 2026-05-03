const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [40, 'file name cannot be more than 40 characters']
    },
    "author": {
        type: String,
        trim: true,
        maxlength: [40, 'author name cannot be more than 40 characters']
    },
    "uploader": {
        type: String,
        required: [true, 'must provide uploader name'],
        trim: true,
        maxlength: [40, 'uploader name cannot be more than 40 characters']
    },
    "description": {
        type: String,
        trim: true
    },
    "protected": {
        type: Boolean,
        default: false
    },
    "fileSize": {
        type: Number
    },
    "fileURI": {
        type: String,
        required: [true, 'file URI must be provided'],
        trim: true
    },
    "previewImageURI": {
        type: String,
        trim: true,
        default: __dirname + `/uploads/images/default.jpg`,
    },
    "uploadDate": {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('File', fileSchema);