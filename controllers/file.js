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
        const file = await File.create(req.body);
        res
            .status(201)
            .json({file});
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

module.exports = {
    getAllFiles,
    createFile,
    deleteFile
};