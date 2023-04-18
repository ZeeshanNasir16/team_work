const rolePermissionModel = require('../model/rolePermissionModel');
const {
  signUpSubject: subject,
  signUpHtml,
  signUpFrom: from,
} = require('../utils/emailMsgs');
const logger = require('../utils/logger');
const HTTPCodes = require('../utils/responses');
const { SendMail } = require('../utils/SendMail');


/**
 * @swagger
 * components:
 *    schemas:
 *        User:
 *            type: object
 *            properties:
 *                first_name:
 *                    type: string
 *                    example: "asif"
 *                last_name:
 *                    type: string
 *                    example: "mehmood"
 *                email:
 *                    type: string
 *                    example: "asif-mehmood@hotmail.com"
 *                mobile_no:
 *                    type: string
 *                    example: "1234567890"
 *                password:
 *                    type: string
 *                    example: "asifM@12345"
 *                confirm_password:
 *                    type: string
 *                    example: "asifM@12345"
 *                user_type_id:
 *                    type: integer
 *                    example: "2"
 */

/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: SignUp user
 *      description: this api is used to add user data to database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: user Signup successfully...
 */

/**
 * @swagger
 * /users/createUser:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: Create user
 *      description: this api is used to add user data to database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/User'
 *      responses:
 *          200:
 *              description: user Register successfully...
 */

exports.create = async (req, res) => {
  console.log(" inside create ")
  const alreadyExists = await rolePermissionModel.getByIdRolePermission(req.body);
  if (alreadyExists.length === 0)
    {
      const resp = await rolePermissionModel.createRolePermission(req.body);
      console.log('Model result :', resp);
      if (!resp)
      return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
      })
      else if(resp.affectedRows == 1){
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: 'Perrmision has been Created',
      })
      }
    }
    else{
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: 'Perrmision Already Exists',
      })
    }
  
};

exports.get = async (req, res) => {
    console.log(" inside get ")
    const resp = await rolePermissionModel.getRolePermission();
    console.log('Model result :', resp);
  if (!resp)
    return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
    })
    else if(resp.affectedRows == 1){
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: 'Perrmision has been Created',
      })
    }else{
      return res.status(HTTPCodes.OK).json(resp)
    }
};

exports.delete = async (req, res) => {
    console.log(" inside delete ")
    const resp = await rolePermissionModel.deleteRolePermission(req.body);
    console.log('Model result :', resp);
  if (!resp)
    return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
    })
    else if(resp.affectedRows == 1){
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: ' Permission has been deleted ',
      })
    }else{
      return res.status(HTTPCodes.OK).json(resp)
    }
};
