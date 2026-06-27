const {StatusCodes} = require('http-status-codes');
const fs = require('fs');
const path = require('path');
const File = require('../models/file.js');
const {BadRequestError, NotFoundError, CustomAPIError, ForbiddenError} = require('../errors');

const getAllFiles = async (req, res) => {

    const {name, author} = req.query;
    const queryObject = {}

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }
    if (author) {
        queryObject.author = {$regex: author, $options: 'i'};
    }

    if (req.user.role == 'student') {
        queryObject.protected = false; // this prevents students from seeing protected files
    }

    let result = File.find(queryObject);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const files = await result;
    
    res
        .status(StatusCodes.OK)
        .json({files})
}

const createFile = async (req, res) => {
    if (!req.file) {
        throw new BadRequestError('File must be provided');
    }

    const {size, path} = req.file;
    
    const {
        name, 
        author, 
        description, 
        protected
    } = req.body;

    const fileData = {
        name,
        author,
        uploader: req.user.id,
        description,
        protected,
        fileSize: size,
        fileURI: path
    }

    const file = await File.create(fileData);

    res
        .status(StatusCodes.CREATED)
        .send();
}

const getFile = async (req, res) => {
    const {id:fileID} = req.params;
    
    const file = await File.findOne({_id: fileID});

    if (!file) {
        throw new NotFoundError('File not found');
    }

    if (file.protected && req.user.role == 'student') {
        throw new ForbiddenError("You don't have permission to read this file");
    }

    res
        .status(StatusCodes.OK)
        .json(file);
}

const deleteFile = async (req, res) => {

    const {id:fileID} = req.params;
    const file = await File.findOneAndDelete({_id: fileID,
                                               uploader: req.user.id});

    if (!file) {
        throw new ForbiddenError("You don't have permission to delete this file");
    }

    const filePath = path.join(__dirname, '..', file.fileURI);

    try {
        await fs.promises.unlink(filePath);
    }
    catch (error) {
        console.warn('File already deleted or missing');
    }

    res
        .status(StatusCodes.OK)
        .send();
}

const editFile = async (req, res) => {

    const{id:fileID} = req.params;

    const file = await File.findOneAndUpdate({_id: fileID, 
                                                uploader: req.user.id}, // checking if user is the owner of that file
                                                req.body, // content that is being updated
                                                {returnDocument: 'after'});

    if (!file) {
        throw new ForbiddenError("You don't have permission to edit this file");
    }

    res
        .status(StatusCodes.OK)
        .send();
}

const downloadFile = async (req, res) => {
    const {id:fileID} = req.params;

    const file = await File.findById(fileID).select('fileURI');

    if (!file) {
        throw new NotFoundError('File not found');
    }

    if (file.protected && req.user.role == 'student') {
        throw new ForbiddenError("You don't have permission to access this file");
    }

    const filePath = path.join(__dirname, '..', file.fileURI);

    return res.download(filePath, 'file.pdf', (err) => {
        if (err) {
            console.error(err);

            if (!res.headersSent) {
                return res.status(500).json({
                    message: 'Something went wrong.'
                });
            }
        }
    });
};

module.exports = {
    getAllFiles,
    createFile,
    getFile,
    deleteFile,
    editFile,
    downloadFile
};