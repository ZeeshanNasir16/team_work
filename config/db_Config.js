const mysql2 = require('mysql2/promise');

const options = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

async function QueryDB(sql, params = []) {
  console.log("inside querydb")
  const connection = await mysql2.createConnection(options);
  const [rows] = await connection.execute(sql, params);
  return rows;
}

module.exports = QueryDB;