const QueryDB = require('../config/db_Config');

const UserModel = {
  getAll: () => QueryDB('Select * from employees'),
};

module.exports = UserModel;
