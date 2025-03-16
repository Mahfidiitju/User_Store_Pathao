const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');

class CrudRepository {
    constructor(model) {
        this.model = model;
    }



    async create(data) {
        console.log(data);
        const reponse = await this.model.create(data);
        return reponse;

    }

    
    async delete(data) {
        try {
            const reponse = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return reponse;
        }
        catch (err) {
            Logger.error('Something went wrong in the crud repo:delete ');
            throw err;
        }
    }
    async get(data) {
        try {
            const reponse = await this.model.findByPk(data);
            if(!reponse)
            {
                throw new Error;
            }
            return reponse;
        }
        catch (err) {
            Logger.error('Something went wrong in the crud repo:get');
            throw err;
        }
    }
    async getAll() {
        try {
            const reponse = await this.model.findAll();
            return reponse;
        }
        catch (err) {
            Logger.error('Something went wrong in the crud repo:get all');
            throw err;
        }
    }
    async update(id, data) {
        try {
            console.log(id,data);
            const reponse = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return reponse;
        }
        catch (err) {
            Logger.error('Something went wrong in the crud repo:update');
            throw err;
        }
    }
}

module.exports = CrudRepository;