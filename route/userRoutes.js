const express = require('express');
const userController = require('../controller/userController');
const validation = require('../validations/userValidations');
const verifyToken = require('../middleware/authenticationMiddleware');
const userRouter = express.Router();

userRouter.post(
  '/register',
  validation.signupValidation,
  userController.signUpUser
);
userRouter.post('/createUser', verifyToken, userController.signUpUser);

module.exports = userRouter;
