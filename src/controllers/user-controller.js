const { UserService } = require('../services');
const { StatusCodes } = require('http-status-codes')
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createUser(req, res) {
    try {

        const userId = await UserService.createUser(req.body);
        return res
            .status(StatusCodes.CREATED)
            .json({ id: userId });
    }
    catch (err) {
        ErrorResponse.error = err;
        return res
            .status(err.statusCode)
            .json(ErrorResponse)
    }
}


async function getOneUser(req, res) {
    try {
        const User = await UserService.getOneUser(req.params.id);
        const { password, createdAt, updatedAt, ...user } = User.toJSON();
        return res
            .status(StatusCodes.OK)
            .json(user)
    }
    catch (err) {
        ErrorResponse.error = err;
        return res
            .status(err.statusCode)
            .json(ErrorResponse)
    }
}



module.exports = {
    createUser, getOneUser
}