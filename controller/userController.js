const UserModel = require('../model/userModel');
const { signUpSubject, signUpHtml } = require('../utils/emailMsgs');
const { SendMail } = require('../utils/SendMail');
// const { SendMail } = require('../utils/SendMail');
exports.signUpUsr = async (req, res) => {
  try {
    registration_data = req.body;

    await UserModel.createUser(registration_data);

    //send email here response:250 = success or response:OK= success

    const { email } = req.body;
    const subject = signUpSubject;
    const htmlMessage = signUpHtml(email);
    const sent = await SendMail(email, subject, htmlMessage);
    // console.log(sent);

    let isEmailSent = sent.response.includes('250');

    if (isEmailSent) {
      return res.status(200).json({
        status: 'success',
        message: 'User signup successfully and email is sent too user',
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(404).json({
      status: 'fail',
      message: 'You Entered incorrect data or something unexpected happened',
      errorMessage: error.message,
    });
  }
};
