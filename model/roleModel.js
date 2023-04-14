const QueryDB = require('../config/db_Config');

exports.createRole = (type) => {
  return QueryDB('INSERT into user_types (type) values(?) ', [type]);
};

exports.getAllRoles = () => {
  return QueryDB('SELECT * from user_types');
};

exports.getRoleById = (roleId) => {
  return QueryDB('SELECT * from user_types where id=? ', [roleId]);
};

exports.updateRole = (type, roleId) => {
  return QueryDB('Update user_types SET type=? where id=? ', [type, roleId]);
};
