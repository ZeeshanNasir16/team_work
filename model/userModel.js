const QueryDB = require('../config/db_Config');
const bcrypt = require('bcrypt');

exports.login = (email) => {
  return QueryDB('Select * from users where email = ?', [email]);
};

exports.createUser = async (registration_data) => {
  const { first_name, last_name, email, mobile_no, password, user_type_id } =
    registration_data;

  registration_data.password = await bcrypt.hash(password, 13);

  const data = [
    first_name,
    last_name,
    email,
    mobile_no,
    registration_data.password,
    user_type_id,
  ];

  return QueryDB(
    'INSERT into users (first_name,last_name,email,mobile_no,password,user_type_id) values(?,?,?,?,?,?) ',
    data
  );
};

exports.getAllUsers = async () => {
  return QueryDB('select * from users');
};
exports.getSingleUser = async (userId) => {
  return QueryDB('select * from users where id = ?', [userId]);
};

exports.updateUser = async (vals, userId) => {
  let query = 'update users SET ';
  let queryParams = [];
  let fieldsToUpdate = [];

  if (vals.password) vals.password = await bcrypt.hash(vals.password, 13);

  for (const [key, value] of Object.entries(vals)) {
    fieldsToUpdate.push(`${key} = ?`);
    queryParams.push(value);
  }
  query += fieldsToUpdate.join(', ');
  query += ' WHERE id = ?';
  queryParams.push(userId);

  return QueryDB(query, queryParams);
};

exports.deleteUser = async (userId) => {
  return QueryDB(`delete from users where id = ?`, [userId]);
};
