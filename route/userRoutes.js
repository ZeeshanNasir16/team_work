const express =  require('express');
const  adminController  = require('../controller/adminController');
const  userController  = require('../controller/userController');

const validationMiddleware =  require('../middleware/validationMiddleware');
const loginSchema  =  require('../validations/userValidations');
const verifyToken = require('../middleware/authenticationMiddleware')
const validation = require('../validations/userValidations');

const userRouter = express.Router();

userRouter.post('/login', validationMiddleware(loginSchema), adminController.adminLogin);
userRouter.post('/createUser', verifyToken, userController.signUpUser);
userRouter.post('/register', validation.signupValidation, userController.signUpUser);

module.exports = userRouter;
