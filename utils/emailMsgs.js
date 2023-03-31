const dotenv = require('dotenv');
dotenv.config();

exports.signUpFrom = `"HR Softoo" <${process.env.NM_USER}>`;
exports.signUpSubject = 'You have signup successfully';
const signUpMsg = 'Thanks for registering';
exports.signUpHtml = (email) => {
  return `Dear <b>${email},</b> ${signUpMsg} `;
};
