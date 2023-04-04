const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const HTTPCodes = require('../utils/responses');
dotenv.config();

module.exports = function verifyToken(req, res, next) {
  console.log('inside verify', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res
      .status(HTTPCodes.NOT_AUTHORIZED)
      .json({ message: 'You are not authorized' });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (!err) {
      if (decoded.id == 1) {
        console.log('user matched');
        next();
      } else {
        res
          .status(HTTPCodes.NOT_AUTHORIZED)
          .json({ message: 'You are not authorized' });
      }
    }
  });
};
