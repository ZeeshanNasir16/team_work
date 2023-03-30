const QueryDB = require('../config/db_Config');
const bcrypt = require('bcrypt');

const UserModel = {
  createUser: async (registration_data) => {
    const { first_name, last_name, email, mobile_no, password, usrType } =
      registration_data;

    registration_data.password = await bcrypt.hash(password, 13);

    const data = [
      first_name,
      last_name,
      email,
      mobile_no,
      registration_data.password,
      usrType,
    ];

    return QueryDB(
      'INSERT into users (first_name,last_name,email,mobile_no,password,user_type_id) values(?,?,?,?,?,?) ',
      data
    );
  },
};

module.exports = UserModel;
