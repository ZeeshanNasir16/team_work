const nodemailer = require('nodemailer');

exports.SendMail = (from, email, subject, htmlMessage) => {
  const transporter = nodemailer.createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    auth: {
      user: process.env.NM_USER,
      pass: process.env.NM_PASS,
    },
  });
  var mailOptions = {
    from: from,
    to: email,
    subject: subject,
    html: htmlMessage,
  };
  return transporter.sendMail(mailOptions);
};
