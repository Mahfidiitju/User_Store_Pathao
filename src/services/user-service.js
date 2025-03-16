const { UserRepository,TagRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes')
const userRepository = new UserRepository();
const tagRepository = new TagRepository();
const AppError = require('../utils/errors/app-error');

async function createUser(data) {
    let error = "";

    try {
        const User = await userRepository.create(data);
        return User.id;
    }
    catch (err) {
        if (error != "") {
            throw new AppError(error, StatusCodes.BAD_REQUEST);
        }
        if (err.name == 'SequelizeValidationError') {

            let explanation = [];
            err.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot Create a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}




async function getOneUser(id) {
    try {
        const User = await userRepository.get(id);
        return User;
    }
    catch (err) {
        if (err.name == 'SequelizeValidationError') {

            let explanation = [];
            err.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot get a new User object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addTags(id,tags,expiry) {
    try {
        if (!tags || !Array.isArray(tags) || !expiry) {
            return res.status(400).json({ error: 'Tags and expiry are required.' });
        }
    
        for (const tag of tags) {
            await tagRepository.create({ userId: id, tag, expiry });
        }
    }
    catch (err) {
        if (err.name == 'SequelizeValidationError') {    

            let explanation = [];
            err.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a tag object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTags(tags) {
    try {
        const tag = await tagRepository.getAll(tags);
        return tag;
    }
    catch (err) {
        if (err.name == 'SequelizeValidationError') {
            let explanation = [];
            err.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot get tags', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createUser,getOneUser,addTags,getTags
}