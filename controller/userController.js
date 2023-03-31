const UserModel = require('../model/userModel');
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
 *                last_name:
 *                    type: string
 *                email:
 *                    type: string
 *                mobile_no:
 *                    type: string
 *                password:
 *                    type: string
 *                confirm_password:
 *                    type: string
 *                user_type_id:
 *                    type: integer
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

exports.signUpUser = async (req, res) => {
  try {
    registration_data = req.body;

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

    return res.status(404).json({
      status: 'fail',
      message:
        'You Entered existing or incorrect data or something unexpected happened',
      errorMessage: error.message,
    });
  }
};
