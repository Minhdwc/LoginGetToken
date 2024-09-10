const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController');

router.post('/create', userController.createUser);
router.get('/all', userController.getAllUser);
router.get('/detail/:id', userController.getDetailUser);
router.delete('/delete/:id', userController.deleteUser);
router.patch('/update/:id', userController.updateUser);
router.post('/login', userController.loginUser);

module.exports = router;