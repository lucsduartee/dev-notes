const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'lucas',
  password: 'lucas18273645',
  host: 'localhost',
  database: 'model_example',
});

module.exports = connection;
