const { StatusCodes } = require('http-status-codes');
const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');

const File = require('../models/file');

const {
    BadRequestError,
    NotFoundError,
    ForbiddenError
} = require('../errors');

const getAllFiles = async (req, res) => {

    const { name, author, uploader } = req.query;
    const queryObject = {};

    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    if (author) {
        queryObject.author = { $regex: author, $options: 'i' };
    }

    if (uploader) {
        queryObject.uploader = uploader;
    }

    if (req.user.role === "student") {
        queryObject.protected = false;
    }

    let result = File.find(queryObject);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const files = await result;

    res.status(StatusCodes.OK).json({ files });
};

const createFile = async (req, res) => {

    if (!req.file) {
        throw new BadRequestError("Arquivo deve ser providenciado.");
    }

    const uploadResult = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "biblioteca",
                resource_type: "raw"
            },
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        streamifier
            .createReadStream(req.file.buffer)
            .pipe(uploadStream);

    });

    const file = await File.create({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        protected: req.body.protected,
        uploader: req.user.id,

        fileURI: uploadResult.secure_url,
        cloudinaryID: uploadResult.public_id,
        fileSize: uploadResult.bytes
    });

    res
        .status(StatusCodes.CREATED)
        .json(file);
};

const getFile = async (req, res) => {

    const { id: fileID } = req.params;

    const file = await File.findById(fileID);

    if (!file) {
        throw new NotFoundError("Arquivo não encontrado.");
    }

    if (file.protected && req.user.role === "student") {
        throw new ForbiddenError("Você não tem permissão para acessar este arquivo.");
    }

    res
        .status(StatusCodes.OK)
        .json(file);
};

const editFile = async (req, res) => {

    const { id: fileID } = req.params;

    const file = await File.findOneAndUpdate(
        {
            _id: fileID,
            uploader: req.user.id
        },
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!file) {
        throw new ForbiddenError("Você não tem permissão para editar este arquivo.");
    }

    res
        .status(StatusCodes.OK)
        .json(file);
};

const deleteFile = async (req, res) => {

    const { id: fileID } = req.params;

    const file = await File.findOne({
        _id: fileID,
        uploader: req.user.id
    });

    if (!file) {
        throw new ForbiddenError("Você não tem permissão para deletar este arquivo.");
    }

    try {

        await cloudinary.uploader.destroy(
            file.cloudinaryID,
            {
                resource_type: "raw"
            }
        );

    } catch (err) {
        console.warn("Erro ao remover arquivo do Cloudinary:", err.message);
    }

    await file.deleteOne();

    res
        .status(StatusCodes.OK)
        .send();
};

const downloadFile = async (req, res) => {

    const { id: fileID } = req.params;

    const file = await File.findById(fileID);

    if (!file) {
        throw new NotFoundError("Arquivo não encontrado.");
    }

    if (file.protected && req.user.role === "student") {
        throw new ForbiddenError("Você não tem permissão para baixar este arquivo.");
    }

    return res.redirect(file.fileURI);
};

module.exports = {
    getAllFiles,
    createFile,
    getFile,
    editFile,
    deleteFile,
    downloadFile
};