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
 *                    example: "1234"
 */

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags:
 *        - auth
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
  const resp = await UserModel.login(req.body.email);
  console.log('Model result :', resp);
  if (!resp)
    return res.status(HTTPCodes.NOT_FOUND).json({
      status: 'success',
      message: 'User not found with this email.',
    });

  bcrypt.compare(req.body.password, resp[0].password, function (err, result) {
    if (result) {
      console.log('resp data : ', resp);
      logger.info('Logged in successfully');
      const token = signToken(resp[0].user_type_id);
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
  });
};
