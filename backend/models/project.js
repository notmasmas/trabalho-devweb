const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [40, 'file name cannot be more than 40 characters']
    },
    "uploader": {
        type: String,
        required: [true, 'must provide uploader name'],
        trim: true,
        maxlength: [40, 'uploader name cannot be more than 40 characters']
    },
    "description": {
        type: String,
        trim: true,
        default: '...'
    },
    "semester": {
        type: String,
        trim: true,
        default: ''
    },
    "fileSize": {
        type: Number,
        default: 0
    },
    "fileURI": {
        type: String,
        required: [true, 'file URI must be provided'],
        trim: true
    },
    "previewImageURI": {
        type: String,
        trim: true,
        default: `uploads/images/default.jpg`,
    },
    "uploadDate": {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', projectSchema);