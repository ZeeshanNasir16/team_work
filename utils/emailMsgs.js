exports.signUpSubject = 'You have signup successfully';
const signUpMsg = 'Thanks for registering';
exports.signUpHtml = (email) => {
  return `Dear <b>${email},</b> ${signUpMsg} `;
};
