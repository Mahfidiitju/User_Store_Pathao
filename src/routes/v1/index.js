const express = require('express');

const { InfoController,UserController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);

// crud
router.post('/user',UserController.createUser);
router.get('/user/:id',UserController.getOneUser);


module.exports = router;