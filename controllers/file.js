const File = require('../models/file.js');

const getAllFiles = async (req, res) => {
    
    try {
        const files = await File.find({});
        res
            .status(200)
            .json({files});
    }
    catch (error) {
        res
            .status(500)
            .json({'msg': error});
    }
}

const createFile = async (req, res) => {
    
    try {

        if (!req.file) {
            return res.status(400).json({'msg': 'File must be provided'});
        }

        const {size, path} = req.file;
        const {name, author, uploader, description, protected} = req.body;

        const fileData = {
            name: name,
            author: author,
            uploader: uploader,
            description: description,
            protected: protected,
            fileSize: size,
            fileURI: path
        }

        const file = await File.create(fileData);

        res
            .status(201)
            .json(file);
    }
    catch (error) {
        res
            .status(500)
            .json({'msg': error});   
    }
}

const deleteFile = async (req, res) => {

    try {
        const {id:fileID} = req.params;
        const file = await File.deleteOne({_id: fileID});

        if (!file) {
            return res
                .status(404)
                .json({'msg': 'File not found'});
        }

        res
            .status(200)
            .json(file);
    }
    catch (error) {
        res
            .status(500)
            .json({'msg': error});   
    }
}

const editFile = async (req, res) => {

    try {
        const{id:fileID} = req.params;
        const file = await File.findByIdAndUpdate({_id: fileID}, req.body, {new: true});

        if (!file) {
            return res
                .status(404)
                .json({'msg': 'File not found'});
        }

        res
            .status(200)
            .json(file);
    }
    catch (error) {

        res
            .status(500)
            .json({'msg': error});
    }
}

module.exports = {
    getAllFiles,
    createFile,
    deleteFile,
    editFile
};