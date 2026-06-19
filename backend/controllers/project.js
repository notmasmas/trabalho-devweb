const {StatusCodes} = require('http-status-codes');
const fs = require('fs');
const Project = require('../models/project');
const {BadRequestError, NotFoundError, CustomAPIError} = require('../errors');

const getAllProjects = async (req, res) => {

    const {title, uploader} = req.query;
    const queryObject = {};

    if (title) {
        queryObject.title = {$regex: title, $options: 'i'};
    }
    if (uploader) {
        queryObject.uploader = {$regex: uploader, $options: 'i'};
    }

    let result = await Project.find(queryObject);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const projects = await result;
    
    res
        .status(StatusCodes.OK)
        .json({projects})
}

const createProject = async (req, res) => {
    if (!req.file) {
        throw new BadRequestError('File must be provided');
    }

    const {size, path} = req.file;

    const {
        title, 
        uploader, 
        description, 
        semester
    } = req.body;

    const fileData = {
        title,
        uploader,
        description,
        semester,
        fileSize: size,
        fileURI: path
    };

    const file = await Project.create(fileData);

    res
        .status(StatusCodes.CREATED)
        .send();
}

const getProject = async (req, res) => {
    const {id:projectID} = req.params;
    
    const project = await Project.findOne({_id: projectID});

    if (!project) {
        throw new NotFoundError('Project not found');
    }

    res
        .status(StatusCodes.OK)
        .json(project);
}

const deleteProject = async (req, res) => {

    const {id:projectID} = req.params;
    const project = await Project.findOneAndDelete({_id: projectID});

    if (!project) {
        throw new NotFoundError('Project not found')
    }

    await fs.unlink(project.fileURI, (error) => {
        if (error) {
            throw new CustomAPIError('Something went wrong. Try again later');
        }
    });

    res
        .status(StatusCodes.OK)
        .send();
}

const editProject = async (req, res) => {

    const{id:projectID} = req.params;
    const project = await Project.findByIdAndUpdate({_id: projectID}, req.body, {returnDocument: 'after'});

    if (!project) {
        throw new NotFoundError('Project not found');
    }

    res
        .status(StatusCodes.OK)
        .send();
}

module.exports = {
    getAllProjects,
    createProject,
    getProject,
    deleteProject,
    editProject
};

