const express = require('express');
// const roleController = require('../controller/roleController');
const rolePermissionController = require('../controller/rolePermissionController');
const rolePermissionRouter = express.Router();

/**
 * @swagger
 * /rolePermission/create:
 *  post:
 *      summary: create Role Permission
 *      tags:
 *          - Roles Permission API
 *      description: This api will create role permission
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Role_Permission'
 *
 *      responses:
 *          200:
 *              description:    Role permission is created successfully
 *          400:
 *              description:    Bad request
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */

rolePermissionRouter.post(
  '/create',
  rolePermissionController.createRolePermission
);

/**
 * @swagger
 * /rolePermission/all:
 *  get:
 *      summary: get all roles
 *      tags:
 *          - Roles Permission API
 *      description: This api will get all roles
 *      content:
 *         application/json:
 *              schema:
 *              $ref: '#components/schemas/Role_Permission'
 *
 *      responses:
 *          200:
 *              description:    All Roles are fetched successfully
 *          400:
 *              description:    Bad request
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */

rolePermissionRouter.get(
  '/all',
  rolePermissionController.getAllRolePermissions
);

/**
 * @swagger
 * /rolePermission/{id}:
 *  get:
 *      summary: get single role
 *      tags:
 *          - Roles Permission API
 *      description: This api will get role of a user
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description:    Role is fetched successfully
 *          400:
 *              description:    Bad request
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */

rolePermissionRouter.get(
  '/:id',
  rolePermissionController.getRolePermissionbyId
);

// rolePermissionRouter.get(
//   '/user-type/:userType',
//   rolePermissionController.getRolePermissionByUserType
// );

/**
 * @swagger
 * /rolePermission/{id}:
 *  put:
 *      summary: update Role
 *      tags:
 *          - Roles Permission API
 *      description: This api will update role
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Role_Permission'
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Roles'
 *
 *      responses:
 *          200:
 *              description:    Role is updated successfully
 *          400:
 *              description:    Bad request
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */

rolePermissionRouter.put('/:id', rolePermissionController.updateRolePermission);

/**
 * @swagger
 * /rolePermission/{id}:
 *  delete:
 *      summary: Delete User
 *      description: this api is used to delete user data from database
 *      tags:
 *          - Roles Permission API
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description:    Role is deleted successfully
 *          400:
 *              description:    Bad request
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */

rolePermissionRouter.delete(
  '/:id',
  rolePermissionController.deleteRolePermission
);

module.exports = rolePermissionRouter;

/*************************Swagger Schema*************************** */

/**
 * @swagger
 * components:
 *    schemas:
 *        Role_Permission:
 *            type: object
 *            properties:
 *                userType:
 *                    type: integer
 *                    example: "enter user type e.g admin/users/member/staff"
 *                permissionId:
 *                    type: integer
 *                    example: "enter permission id (must be digit)"
 */
