const QueryDB = require('../config/db_Config');
exports.login = (email) => {
  return QueryDB('Select * from users where email = ?', [email]);
};
