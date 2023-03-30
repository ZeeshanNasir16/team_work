const UserModel = require('../model/user');
// const { SendMail } = require('../utils/SendMail');
exports.signUpUser = async (req, res) => {
  try {
    registration_data = req.body;

    await UserModel.createUser(registration_data);

    return res.status(200).json({
      status: 'success',
      message: 'Data added successfully',
    });
  } catch (error) {
    // console.log(error);
    return res.status(404).json({
      status: 'fail',
      message: 'error',
      errorMessage: error.message,
    });
  }
};
