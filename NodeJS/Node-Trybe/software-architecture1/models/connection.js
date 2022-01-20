const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: 'model_example',
});

module.exports = connection;
