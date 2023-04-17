const express = require('express');
const adminController = require('../controller/adminController');
const userController = require('../controller/userController');

const validationMiddleware = require('../middleware/validationMiddleware');
const { loginSchema } = require('../validations/userValidations');
const verifyToken = require('../middleware/authenticationMiddleware');
const validation = require('../validations/userValidations');
const checkPermission = require('../middleware/checkPermission');
const rolePermissioncontroller = require('../controller/rolePermissionController');
const userRouter = express.Router();

 userRouter.post('/login',validationMiddleware(loginSchema),adminController.adminLogin);
// userRouter.post('/createUser',verifyToken,validation.signupValidation,userController.signUpUser);
// userRouter.post('/register',validation.signupValidation,userController.signUpUser);

userRouter.post('/createRolePermission', verifyToken, checkPermission, rolePermissioncontroller.create);
userRouter.get('/getRolePermission', verifyToken, checkPermission, rolePermissioncontroller.get);
userRouter.delete('/deleteRolePermission', verifyToken, checkPermission, rolePermissioncontroller.delete);


module.exports = userRouter;
