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
        const { password, createdAt, updatedAt, firstName, lastName, ...user } = User.toJSON();
        const formattedUser = {
            id: user.id,
            name: `${firstName} ${lastName}`,
            phone: user.phone
        };
        return res
            .status(StatusCodes.OK)
            .json(formattedUser);
    }
    catch (err) {
        ErrorResponse.error = err;
        return res
            .status(err.statusCode)
            .json(ErrorResponse)
    }
}

async function addTags(req, res) {
    try {
        const { id } = req.params;
        const { tags, expiry } = req.body;
        const response = await UserService.addTags(id,tags,expiry);

        return res
            .status(StatusCodes.OK)
            .json({});
    } catch (err) {
        ErrorResponse.error = err;
        return res
            .status(err.statusCode)
            .json(ErrorResponse)
    }
}

async function getTags(req, res) {
    try {
        const { tags } = req.query;
  
        const response = await UserService.getTags(tags);
        return res
            .status(StatusCodes.OK)
            .json(response);
    } catch (err) {
        ErrorResponse.error = err;
        return res
            .status(err.statusCode)
            .json(ErrorResponse)
    }
}



module.exports = {
    createUser, getOneUser, addTags,getTags
}