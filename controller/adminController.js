const UserModel  =  require('../model/userModel.js');
const catchAsync =  require('../utils/catchAsync.js');
const logger =  require('../utils/logger.js');
const  HTTPCodes  =  require('../utils/responses.js');
const bcrypt =  require('bcrypt');

const { signToken } = require('../utils/createToken.js');

  exports.adminLogin =  async (req, res, next) => {

      const [result] = await UserModel.login(req.body.email);
      console.log(result);
      if (!result) {
        return res.status(HTTPCodes.NOT_FOUND).json({
          status: 'success',
          message: 'User not found with this email.',
        });
      }

      bcrypt.compare(req.body.password, result.password, function(err, result) {
        console.log(result)
        if(result){
            logger.info("Logged in successfully")
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
    });
  };
  