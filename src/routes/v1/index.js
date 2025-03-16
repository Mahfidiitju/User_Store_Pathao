const express = require('express');

const {UserController } = require('../../controllers');
const validateMobileNumber = require('../../middlewares/mobileNumValidation');

const router = express.Router();


// user
router.post('/user',validateMobileNumber,UserController.createUser);
router.get('/user/:id',UserController.getOneUser);


// tag
router.post('/users/:id/tags',UserController.addTags);
router.get('/users',UserController.getTags);

module.exports = router;