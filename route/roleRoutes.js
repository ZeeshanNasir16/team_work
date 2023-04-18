const express = require('express');
const roleController = require('../controller/roleController');
const roleRouter = express.Router();

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

roleRouter.post('/createRole', roleController.createRole);

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

roleRouter.get('/getAllRoles', roleController.getAllRoles);

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

roleRouter.get('/getRoleById/:id', roleController.getRolebyId);

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
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Update'
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

roleRouter.put('/updateRole/:id', roleController.updateRole);

/**
 * @swagger
 * /user/deleteRole/{id}:
 *  delete:
 *      summary: Delete User
 *      description: this api is used to delete user data from database
 *      tags:
 *          - Roles API
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

roleRouter.delete('/deleteRole/:id', roleController.deleteRole);

module.exports = roleRouter;

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

/**
 * @swagger
 * components:
 *    schemas:
 *        Update:
 *            type: object
 *            properties:
 *                type:
 *                    type: string
 *                    example: "enter user type e.g admin/users/member/staff"
 */
