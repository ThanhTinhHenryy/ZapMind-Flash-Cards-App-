// utils/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME, // Tên cơ sở dữ liệu
  process.env.DB_USER, // Tên người dùng
  process.env.DB_PASSWORD, // Mật khẩu người dùng
  {
    host: process.env.DB_HOST, // Địa chỉ của MySQL
    dialect: "mysql", // Loại cơ sở dữ liệu
    logging: false, // Tắt logging
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    // Cách khác nếu MySQL đang dùng `caching_sha2_password`
    dialectModule: require("mysql2"),
  }
);

module.exports = { sequelize };
