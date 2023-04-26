const express = require('express');
const {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
} = require('../controller/permissionController');
const permRouter = express.Router();
const verifyToken = require('../middleware/authenticationMiddleware');
const checkPermission = require('../middleware/checkPermission');

/**
 * @swagger
 * /permissions:
 *  post:
 *      summary: create permission
 *      tags:
 *          - Permissions
 *      security:
 *          - bearerAuth: []
 *      description: This api will create permission
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Permission_MC'
 *
 *      responses:
 *          200:
 *              description:    Permission is created successfully
 *          500:
 *              description:    Internal Server Error
 */
permRouter.post('/', verifyToken, checkPermission('create'), createPermission);

/**
 * @swagger
 * /permissions:
 *  get:
 *      summary: get all permissions
 *      tags:
 *          - Permissions
 *      security:
 *          - bearerAuth: []
 *      description: This api will get all permissions
 *      content:
 *         application/json:
 *              schema:
 *              $ref: '#components/schemas/Permission'
 *
 *      responses:
 *          200:
 *              description:    All permissions are fetched successfully
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */
permRouter.get('/', verifyToken, checkPermission('view'), getPermissions);

/**
 * @swagger
 * /permissions/{id}:
 *  patch:
 *      summary: update permission
 *      tags:
 *          - Permissions
 *      description: This api will update permission
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Permission_MC'
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
 *              description:    Permission is updated successfully
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */
permRouter.patch(
  '/:id',
  verifyToken,
  checkPermission('update'),
  updatePermission
);

/**
 * @swagger
 * /permissions/{id}:
 *  delete:
 *      summary: Delete permission
 *      description: this api is used to delete specific permission from database
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Permissions
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID required
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description:    Permission is deleted successfully
 *          404:
 *              description:    Server does not found resource
 *          500:
 *              description:    Internal Server Error
 */
permRouter.delete(
  '/:id',
  verifyToken,
  checkPermission('delete'),
  deletePermission
);

/*************************Swagger Schema*************************** */

/**
 * @swagger
 * components:
 *    schemas:
 *        Permission_MC:
 *            type: object
 *            properties:
 *                permission_name:
 *                    type: string
 *                    example: "insert"
 *        Permission:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                permission_name:
 *                    type: string
 */

module.exports = permRouter;
