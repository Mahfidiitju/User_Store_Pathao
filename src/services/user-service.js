const { UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes')
const userRepository = new UserRepository();
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


module.exports = {
    createUser,getOneUser
}