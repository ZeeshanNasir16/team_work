const mysql2 = require('mysql2/promise');

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

async function QueryDB(sql, params = []) {
  console.log("inside querydb")
  console.log(options)
  const connection = await mysql2.createConnection(options);
  console.log('sql', sql, 'params', params);
  const [rows] = await connection.execute(sql, params);
  console.log('rows', rows);
  return rows;
}

module.exports = QueryDB;