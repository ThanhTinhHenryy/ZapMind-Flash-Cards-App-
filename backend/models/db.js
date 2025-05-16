const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Gói lại kết nối để dùng Promise
const dbPromise = db.promise();

module.exports = dbPromise;
