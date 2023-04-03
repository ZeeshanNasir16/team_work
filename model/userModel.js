const QueryDB = require('../config/db_Config');
const UserModel = {
  login: (email) => QueryDB('Select * from users where email = ?', [email]),
};

module.exports = UserModel;
