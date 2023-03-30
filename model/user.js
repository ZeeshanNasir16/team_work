const QueryDB = require('../config/db_Config');

const UserModel = {
  getAll: () => QueryDB('Select * from users'),
  getUsers: () => QueryDB('Select * from users where user_type_id != 1'),
  addNew: () => QueryDB('Insert into users '),
};

module.exports = UserModel;
