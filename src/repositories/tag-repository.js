const CrudRepository = require('./crud-repository');
const { User, Tag, Sequelize } = require('../models');  // assuming User and Tag are the models
const { Op } = Sequelize;

class TagRepository extends CrudRepository {
    constructor() {
        super(Tag);
    }

    async getAll(tags) {
        try {
            const tagList = tags.split(',').map(tag => tag.trim());
            console.log('tagList:', tagList);

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

            console.log('tagsWithUsers:', tagsWithUsers);


            const usersMap = {};

            tagsWithUsers.forEach(tag => {
                const userId = tag.userId;
                const createdAt = new Date(tag.createdAt);
                let expireTime = BigInt(createdAt.getTime());
                expireTime += BigInt(tag.expiry);
                const currentTime = new Date().getTime();
                // console.log('expiryTime:', expireTime);
                // console.log('currentTime:', currentTime);
                if (currentTime > expireTime) {
                    console.log(`Tag "${tag.tag}" has expired and will be skipped.`);
                    return;
                }

                if (!usersMap[userId]) {
                    usersMap[userId] = {
                        id: userId,
                        name: `${tag.User.firstName} ${tag.User.lastName}`,
                        tags: []
                    };
                }

                usersMap[userId].tags.push(tag.tag);
            });



            const result = Object.values(usersMap);

            // console.log('Result:', result);

            return { users: result };
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = TagRepository;
