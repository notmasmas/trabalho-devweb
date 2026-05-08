const File = require('../models/file.js');

const getAllFiles = async (req, res) => {
    
    try {
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
            .status(200)
            .json({files})
    }
    catch (error) {
        res
            .status(201)
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

const downloadFile = async (req, res) => {

    try {
        const {id:fileID} = req.params;
        const {fileURI} = await File.findOne({_id: fileID}, {fileURI: 1});

        if (!fileURI) {
            return res
                .status(404)
                .json({'msg': 'File not found'});
        }

        res
            .status(200)
            .download(fileURI, 'file.pdf', (error) => {

                if (error) {
                   return res
                        .status(500)
                        .json({'msg': error.msg});
                }
            })
    }
    catch (error) {
        res
            .status(500)
            .json({'msg': error})
    }
}

module.exports = {
    getAllFiles,
    createFile,
    deleteFile,
    editFile,
    downloadFile
};