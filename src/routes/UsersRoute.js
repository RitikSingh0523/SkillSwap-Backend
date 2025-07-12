const express = require('express');
const route = express.Router();

const { userSave } = require('../controllers/UserController/userController');
const { validateUser, validateLogin } = require('../middleware/validateBody');
const { loginController } = require('../controllers/AuthController/loginController');

route.post('/auth/register', validateUser, userSave);
route.post('/auth/login',validateLogin,loginController);

module.exports = route;
