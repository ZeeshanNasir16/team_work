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

userRouter.post(
  '/login',
  validationMiddleware(loginSchema),
  adminController.adminLogin
);
userRouter.post(
  '/createUser',
  verifyToken,
  validation.signupValidation,
  userController.signUpUser
);
userRouter.post(
  '/register',
  validation.signupValidation,
  userController.signUpUser
);

userRouter.get(
  '/getUsers',
  verifyToken,
  checkPermission('view'),
  userController.getUsers
);
userRouter.get(
  '/getUserById/:userId',
  verifyToken,
  checkPermission('view'),
  userController.getSingleUser
);
userRouter.delete(
  '/deleteUser/:userId',
  verifyToken,
  checkPermission('delete'),
  userController.deleteUser
);
userRouter.patch(
  '/updateUser/:userId',
  verifyToken,
  checkPermission('update'),
  userController.updateUser
);

module.exports = userRouter;
