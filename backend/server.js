// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mysql = require("mysql2");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Cấu hình kết nối MySQL
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// // Kiểm tra kết nối DB
// db.connect((err) => {
//   if (err) {
//     console.error("Lỗi kết nối cơ sở dữ liệu: ", err);
//   } else {
//     console.log("Kết nối cơ sở dữ liệu thành công!");

//     // Truy vấn để lấy danh sách bộ thẻ
//     const sql = "SELECT * FROM decks"; // Lệnh SQL lấy tất cả bộ thẻ
//     db.query(sql, (err, results) => {
//       if (err) {
//         console.error("Lỗi khi lấy danh sách bộ thẻ: ", err);
//       } else {
//         console.log("Danh sách bộ thẻ: ", results); // Log kết quả ra console
//       }
//     });
//   }
// });

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hello from Backend!");
// });

// // Lắng nghe trên cổng 5000
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Cấu hình biến môi trường từ file .env
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const authRoutes = require("./routes/authRoutes");
const deckRoutes = require("./routes/deckRoutes");
const cardRoutes = require("./routes/cardRoutes");

// Sử dụng các route
app.use("/api/auth", authRoutes); // Đăng ký và đăng nhập
app.use("/api/decks", deckRoutes); // CRUD của deck , get theo name, get theo userid, get publicpublic
app.use(
  "/uploads/cards",
  express.static(path.join(__dirname, "uploads/cards"))
);
app.use(
  "/uploads/decks",
  express.static(path.join(__dirname, "uploads/decks"))
);
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Lắng nghe cổng
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
