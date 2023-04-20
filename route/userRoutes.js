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

userRouter.post(
  '/createRolePermission',
  verifyToken,
  checkPermission,
  rolePermissioncontroller.createRolePermission
);
userRouter.get(
  '/getRolePermission',
  verifyToken,
  checkPermission,
  rolePermissioncontroller.getAllRolePermissions
);
userRouter.delete(
  '/deleteRolePermission',
  verifyToken,
  checkPermission,
  rolePermissioncontroller.deleteRolePermission
);

userRouter.get(
  '/getUsers',
  verifyToken,
  checkPermission,
  userController.getUsers
);
userRouter.get(
  '/getUserById/:userId',
  verifyToken,
  checkPermission,
  userController.getSingleUser
);
userRouter.delete(
  '/deleteUser/:userId',
  verifyToken,
  checkPermission,
  userController.deleteUser
);
userRouter.patch(
  '/updateUser/:userId',
  verifyToken,
  checkPermission,
  userController.updateUser
);

module.exports = userRouter;
