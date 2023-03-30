const QueryDB = require('../config/db_Config');

const UserModel = {
  createUser: (registration_data) => {
    const { first_name, last_name, email, mobile_no, password, user_type_id } =
      registration_data;

    const data = [
      first_name,
      last_name,
      email,
      mobile_no,
      password,
      user_type_id,
    ];

    return QueryDB(
      'INSERT into users (first_name,last_name,email,mobile_no,password,user_type_id) values(?,?,?,?,?,?) ',
      data
    );
  },
};

module.exports = UserModel;
