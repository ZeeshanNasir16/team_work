const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

exports.SendMail = (email, subject, htmlMessage) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
    },
  });

  var mailOptions = {
    from: process.env.NM_USER,
    to: email,
    subject: subject,
    html: htmlMessage,
  };

  return transporter.sendMail(mailOptions);
};
