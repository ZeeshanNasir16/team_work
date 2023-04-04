const QueryDB = require('../config/db_Config');
const bcrypt = require('bcrypt');


exports.login = (email) => { 
return QueryDB('Select * from users where email = ?', [email]);
}

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
