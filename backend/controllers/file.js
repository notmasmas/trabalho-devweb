const File = require('../models/file.js');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError, CustomAPIError} = require('../errors');

const getAllFiles = async (req, res) => {

    const {name, author, uploader} = req.query;
    const queryObject = {}

    if (name) {
        queryObject.name = {$regex: name, $options: 'i'};
    }
    if (author) {
        queryObject.author = {$regex: author, $options: 'i'};
    }
    if (uploader) {
        queryObject.uploader = {$regex: uploader, $options: 'i'};
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
    const {name, author, uploader, description, protected} = req.body;

    const fileData = {
        name,
        author,
        uploader,
        description,
        protected,
        fileSize: size,
        fileURI: path
    }

    const file = await File.create(fileData);

    res
        .status(StatusCodes.CREATED)
        .json(file);
}

const deleteFile = async (req, res) => {

    const {id:fileID} = req.params;
    const file = await File.deleteOne({_id: fileID});

    if (!file) {
        throw new NotFoundError('File not found')
    }

    res
        .status(200)
        .json(file);
}

const editFile = async (req, res) => {

    const{id:fileID} = req.params;
    const file = await File.findByIdAndUpdate({_id: fileID}, req.body, {returnDocument: 'after'});

    if (!file) {
        throw new NotFoundError('File not found');
        console.log('Got here');
    }

    res
        .status(StatusCodes.OK)
        .json(file);
}

const downloadFile = async (req, res) => {

    const {id:fileID} = req.params;
    const {fileURI} = await File.findOne({_id: fileID}, {fileURI: 1});

    if (!fileURI) {
        throw new NotFoundError('File not found');
    }

    res
        .status(StatusCodes.OK)
        .download(fileURI, 'file.pdf', (error) => {
            if (error) {
                throw new CustomAPIError('Something went wrong. Try again later!')
            }
        })
}

module.exports = {
    getAllFiles,
    createFile,
    deleteFile,
    editFile,
    downloadFile
};