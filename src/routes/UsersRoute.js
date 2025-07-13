const express = require('express');
const route = express.Router();

const {
  userSave,
  getUserProfile,
  getOtherUserProfile,
  updateUserProfile,
} = require('../controllers/UserController/userController');

const {
  validateUser,
  validateLogin,
  validateUserProfile,
  validateOtherUserProfile,
  validateConnectionData,
} = require('../middleware/validateBody');

const {
  loginController,
} = require('../controllers/AuthController/loginController');
const { authUser } = require('../middleware/authUser');
const Connection = require('../models/ConnectionModel');
const { setConnection, updateConnection } = require('../controllers/ConnectionController/connectionController');

//Create User
route.post('/auth/register', validateUser, userSave);

//Login User
route.post('/auth/login', validateLogin, loginController);

// Get User Profile
route.get('/user/profile/me',authUser, getUserProfile);

// Get another User Profile
route.get('/user/profile/:id',authUser, validateOtherUserProfile, getOtherUserProfile);

//edit User Profile
route.put('/user/profile/:id',authUser, validateOtherUserProfile, updateUserProfile);

//Send Connection Request
route.post('/user/connection/:id', authUser, validateConnectionData, setConnection );

//Update Connection Request
route.put('/user/connection/:id', authUser, validateConnectionData, updateConnection);

module.exports = route;
