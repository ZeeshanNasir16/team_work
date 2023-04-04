const UserModel = require('../model/userModel.js');
const catchAsync = require('../utils/catchAsync.js');
const logger = require('../utils/logger.js');
const HTTPCodes = require('../utils/responses.js');
const bcrypt = require('bcrypt');

const { signToken } = require('../utils/createToken.js');

/**
 * @swagger
 * components:
 *    schemas:
 *        Login:
 *            type: object
 *            properties:
 *                email:
 *                    type: string
 *                    example: "admin@softoo.co"
 *                password:
 *                    type: string
 *                    example: "123"
 */

/**
 * @swagger
 * /users/login:
 *  post:
 *      summary: Login Admin
 *      description: This api will login user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                   schema:
 *                       $ref: '#components/schemas/Login'
 *
 *      responses:
 *          200:
 *              description: user added successfully...
 */

exports.adminLogin = async (req, res, next) => {
  const [result] = await UserModel.login(req.body.email);
  if (!result) {
    return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
    });
  }

  bcrypt.compare(req.body.password, result.password, function (err, result) {
    if (result) {
      logger.info('Logged in successfully');
      const token = signToken(result.user_type_id);
      res.set('Authorization', `Bearer ${token}`);
      return res.status(HTTPCodes.OK).json({
        status: 'success',
        message: 'User Logged In',
      });
    }
    return res.status(HTTPCodes.BAD_REQUEST).json({
      status: 'failed',
      message: 'Incorrect Password',
    });
};
