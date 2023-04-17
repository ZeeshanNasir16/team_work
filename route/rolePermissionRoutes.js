const express = require('express');
// const roleController = require('../controller/roleController');
const rolePermissionController = require('../controller/rolePermissionController');
const rolePermissionRouter = express.Router();

/**
 * @swagger
 * /user/createRole:
 *  post:
 *      summary: create Role
 *      tags:
 *          - Roles API
 *      description: This api will create role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Roles'
 *
 *      responses:
 *          200:
 *              description:    Role is created successfully
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
 * /user/getAllRoles:
 *  get:
 *      summary: get all roles
 *      tags:
 *          - Roles API
 *      description: This api will get all roles
 *      content:
 *         application/json:
 *              schema:
 *              $ref: '#components/schemas/Roles'
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
 * /user/getRoleById/{id}:
 *  get:
 *      summary: get single role
 *      tags:
 *          - Roles API
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

rolePermissionRouter.get(
  '/user-type/:userType',
  rolePermissionController.getRolePermissionByUserType
);
/**
 * @swagger
 * /user/updateRole/{id}:
 *  put:
 *      summary: update Role
 *      tags:
 *          - Roles API
 *      description: This api will update role
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
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
 *        Roles:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    example: "ID will be number"
 *                type:
 *                    type: string
 *                    example: "enter user type e.g admin/users/member/staff"
 */
