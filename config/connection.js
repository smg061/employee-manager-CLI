const mysql = require('mysql');
require('dotenv').config;

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Panzervor1',
  database: 'employees_db',
});


module.exports = connection;