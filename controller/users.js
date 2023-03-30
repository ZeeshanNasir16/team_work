const UserModel = require('../model/user');
// const { SendMail } = require('../utils/SendMail');
exports.registerUser = async (req, res) => {
  try {
    registration_data = req.body;
    // const { email } = req.body;

    const usrType = req.body.user_type_id;
    if (usrType === 1) {
      return res.status(400).json({
        status: 'fail',
        message: 'unauthorized access',
      });
    }
    const result = await UserModel.createUser(registration_data);

    // console.log('result', result);
    // const sent = await SendMail(email, subject, htmlMessage);
    // console.log(sent);
    return res.status(200).json({
      status: 'success',
      message: 'Data added successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      status: 'fail',
      message: 'error',
      errorMessage: error.message,
    });
  }
};
