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
} = require('../middleware/validateBody');

const {
  loginController,
} = require('../controllers/AuthController/loginController');

//Create User
route.post('/auth/register', validateUser, userSave);

//Login User
route.post('/auth/login', validateLogin, loginController);

// Get User Profile
route.get('/user/profile/me', validateUserProfile, getUserProfile);

// Get another User Profile
route.get('/user/profile/:id', validateOtherUserProfile, getOtherUserProfile);

//edit User Profile
route.put('/user/profile/:id', validateOtherUserProfile, updateUserProfile);

module.exports = route;
