const UserModel = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const {
  signUpSubject: subject,
  signUpHtml,
  signUpFrom: from,
} = require('../utils/emailMsgs');
const logger = require('../utils/logger');
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
 *      tags:
 *        - auth
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
 *      tags:
 *        - auth
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

exports.signUpUser = async (req, res) => {
  try {
    const registration_data = req.body;
    await UserModel.createUser(registration_data);
    const { email } = req.body;
    const sent = await SendMail(from, email, subject, signUpHtml(email));
    let isEmailSent = sent.response.includes('250');

    if (isEmailSent) {
      return res.status(200).json({
        status: 'success',
        message: 'User signup successfully and email is sent to user',
      });
    }
  } catch (error) {
    logger.error(error.message);
    if (error.errno === -4039) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email did not sent to the user due to connection error',
        errorMessage: error.message,
      });
    }
    return res.status(404).json({
      status: 'fail',
      message:
        'You Entered existing or incorrect data or something unexpected happened',
      errorMessage: error.message,
    });
  }
};

/**
 * @swagger
 * /users/getUsers:
 *  get:
 *    summary: Getting all users
 *    tags:
 *      - Users (CRUD)
 *    security:
 *      - bearerAuth: []
 *    description: this api will get all user data
 *    responses:
 *         200:
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schemas/User'
 */
exports.getUsers = catchAsync(async (req, res) => {
  const result = await UserModel.getAllUsers();

  if (result.length > 0) {
    res.json({ success: true, payload: result });
  } else {
    res.json({ success: false, message: 'no record available to show...' });
  }
});

/**
 * @swagger
 * /users/getUserById/{userId}:
 *  get:
 *    summary: Getting selected user
 *    tags:
 *      - Users (CRUD)
 *    security:
 *      - bearerAuth: []
 *    description: this api will get selected user
 *    parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: Numeric Id required
 *          schema:
 *            type: integer
 *    responses:
 *         200:
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schemas/User'
 */
exports.getSingleUser = catchAsync(async (req, res) => {
  const result = await UserModel.getSingleUser(req.params.userId);
  if (result.length > 0) {
    res.json({ success: true, payload: result });
  } else {
    res.json({ success: false, message: 'record does not exist.' });
  }
});

/**
 * @swagger
 * /users/deleteUser/{userId}:
 *  delete:
 *    summary: Delete User
 *    tags:
 *      - Users (CRUD)
 *    security:
 *      - bearerAuth: []
 *    description: this api will delete selected user
 *    parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: Numeric Id required
 *          schema:
 *            type: integer
 *    responses:
 *         200:
 *            description: user removed successfully...
 */

exports.deleteUser = catchAsync(async (req, res) => {
  const result = await UserModel.deleteUser(req.params.userId);
  if (result.affectedRows > 0) {
    res.json({ success: true, payload: result });
  } else {
    res.json({ success: false, message: 'user does not exist.' });
  }
});

/**
 * @swagger
 * /users/updateUser/{userId}:
 *  patch:
 *    summary: Update User
 *    tags:
 *      - Users (CRUD)
 *    security:
 *      - bearerAuth: []
 *    description: this api will update selected user
 *    parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: Numeric Id required
 *          schema:
 *            type: integer
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                    schema:
 *                        $ref: '#components/schemas/User'
 *    responses:
 *         200:
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: array
 *                         items:
 *                             $ref: '#components/schemas/User'
 */
exports.updateUser = catchAsync(async (req, res) => {
  const result = await UserModel.updateUser(req.body, req.params.userId);

  res.json({ success: true, payload: result });
});
