const {StatusCodes} = require('http-status-codes');
const fs = require('fs');
const File = require('../models/file.js');
const {BadRequestError, NotFoundError, CustomAPIError} = require('../errors');

const getAllFiles = async (req, res) => {

    const {title, author, uploader} = req.query;
    const queryObject = {}

    if (title) {
        queryObject.title = {$regex: title, $options: 'i'};
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
    const {
        title, 
        author, 
        uploader, 
        description, 
        protected
    } = req.body;

    const fileData = {
        title,
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
        .send();
}

const getFile = async (req, res) => {
    const {id:fileID} = req.params;
    
    const file = await File.findOne({_id: fileID});

    if (!file) {
        throw new NotFoundError('File not found');
    }

    res
        .status(StatusCodes.OK)
        .json(file);
}

const deleteFile = async (req, res) => {

    const {id:fileID} = req.params;
    const file = await File.findOneAndDelete({_id: fileID});

    if (!file) {
        throw new NotFoundError('File not found')
    }

    await fs.unlink(file.fileURI, (error) => {
        if (error) {
            throw new CustomAPIError('Something went wrong. Try again later');
        }
    });

    res
        .status(StatusCodes.OK)
        .send();
}

const editFile = async (req, res) => {

    const{id:fileID} = req.params;
    const file = await File.findByIdAndUpdate({_id: fileID}, req.body, {returnDocument: 'after'});

    if (!file) {
        throw new NotFoundError('File not found');
    }

    res
        .status(StatusCodes.OK)
        .send();
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
    getFile,
    deleteFile,
    editFile,
    downloadFile
};