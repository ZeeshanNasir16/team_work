const express = require('express');
// const roleController = require('../controller/roleController');
const rolePermissionController = require('../controller/rolePermissionController');
const rolePermissionRouter = express.Router();
const verifyToken = require('../middleware/authenticationMiddleware')
const checkPermission = require('../middleware/checkPermission')


/**
 * @swagger
 * /rolePermission/create:
 *  post:
 *      summary: create Role Permission
 *      tags:
 *          - Roles Permission API
 *      security:
 *        - bearerAuth: []
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
  verifyToken,
  checkPermission,
  rolePermissionController.createRolePermission
);

/**
 * @swagger
 * /rolePermission/all:
 *  get:
 *      summary: get all roles
 *      tags:
 *          - Roles Permission API
 *      security:
 *        - bearerAuth: []
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
  verifyToken,
  checkPermission,
  rolePermissionController.getAllRolePermissions
);

/**
 * @swagger
 * /rolePermission/{id}:
 *  get:
 *      summary: get single role
 *      tags:
 *          - Roles Permission API
 *      security:
 *        - bearerAuth: []
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
  verifyToken,
  checkPermission,
  rolePermissionController.getRolePermissionbyId
);

// rolePermissionRouter.get(
//   '/user-type/:userType',
//   rolePermissionController.getRolePermissionByUserType
// );

/**
 * @swagger
 * /rolePermission/update:
 *  put:
 *      summary: update Role
 *      tags:
 *          - Roles Permission API
 *      security:
 *        - bearerAuth: []
 *      description: This api will update role
 *      
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Update_Role_Permission'
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

rolePermissionRouter.put('/update',verifyToken,
checkPermission, rolePermissionController.updateRolePermission);

/**
 * @swagger
 * /rolePermission/delete:
 *  delete:
 *      summary: Delete User
 *      description: this api is used to delete user data from database
 *      tags:
 *          - Roles Permission API
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Role_Permission'
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
  '/delete',
  verifyToken,
  checkPermission,
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
 *                user_type_id:
 *                    type: integer
 *                    example: "enter user type value e.g 1:admin, 2:member, 3:applocant"
 *                permission_id:
 *                    type: integer
 *                    example: "enter permission id (must be digit)"
 */
 /**  @swagger
 *  components:
 *    schemas:
 *        Update_Role_Permission:
 *            type: object
 *            properties:
 *                user_type_id:
 *                    type: integer
 *                    example: "enter user type value e.g 1:admin, 2:member, 3:applocant"
 *                permission_id:
 *                    type: integer
 *                    example: "enter permission id (must be digit)"
 *                new_permission_id:
 *                    type: integer
 *                    example: "enter permission id (must be digit)"
 *    
 */
