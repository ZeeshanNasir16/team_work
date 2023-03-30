const UserModel = require('../model/userModel');
// const { SendMail } = require('../utils/SendMail');
exports.signUpUsr = async (req, res) => {
  try {
    registration_data = req.body;

    await UserModel.createUser(registration_data);

    //send email here response:250 = success or response:OK= success

    return res.status(200).json({
      status: 'success',
      message: 'Data added successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(404).json({
      status: 'fail',
      message: 'You Entered incorrect data or something unexpected happened',
      errorMessage: error.message,
    });
  }
};
