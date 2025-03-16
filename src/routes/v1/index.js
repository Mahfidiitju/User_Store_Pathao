const express = require('express');

const { InfoController,UserController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);

// user
router.post('/user',UserController.createUser);
router.get('/user/:id',UserController.getOneUser);


// tag
router.post('/users/:id/tags',UserController.addTags);
router.get('/users',UserController.getTags);

module.exports = router;