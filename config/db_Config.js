const mysql2 = require('mysql2/promise');
const logger = require('../logger');

const connection = mysql2.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function QueryDB(sql, params = []) {
  const connection = await mysql2.createConnection(options);
  const [rows] = await connection.execute(sql, params);
  return rows;
}

module.exports = { QueryDB, connection };
