const CrudRepository = require('./crud-repository');
const { User, Tag, Sequelize } = require('../models');
const { Op } = Sequelize;

class TagRepository extends CrudRepository {
    constructor() {
        super(Tag);
    }

    async getAll(tags) {
        try {
            const tagList = tags.split(',').map(tag => tag.trim());
            const tagsWithUsers = await Tag.findAll({
                where: {
                    tag: {
                        [Op.in]: tagList
                    }
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName'],
                    required: true,
                    where: {
                        id: {
                            [Op.in]: Sequelize.literal(`(SELECT "userId" FROM "Tags" WHERE "tag" IN (${tagList.map(tag => `'${tag}'`).join(',')}) )`)
                        }
                    }
                }
            });
            return tagsWithUsers;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = TagRepository;
