const db = require("./db");

const UserModel = {
  // Lấy tất cả người dùng
  getAllUsers: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM users");
      return rows; // Trả về danh sách tất cả người dùng
    } catch (error) {
      throw new Error("Lỗi khi lấy tất cả người dùng: " + error.message); // Xử lý lỗi khi query
    }
  },

  // Lấy người dùng theo ID
  getUserById: async (id) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return rows[0]; // Trả về user đầu tiên nếu có, hoặc undefined nếu không có
    } catch (error) {
      throw new Error("Lỗi khi tìm người dùng theo ID: " + error.message);
    }
  },

  // Lấy người dùng theo email
  getUserByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0]; // Trả về user đầu tiên nếu có, hoặc undefined nếu không có
    } catch (error) {
      throw new Error("Lỗi khi tìm người dùng theo email: " + error.message);
    }
  },

  // Tạo người dùng mới
  createUser: async ({ email, password }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (email, password_hash) VALUES (?, ?)",
        [email, password]
      );
      return { id: result.insertId, email }; // Trả về thông tin user mới
    } catch (error) {
      throw new Error("Lỗi khi tạo người dùng: " + error.message);
    }
  },

  // Cập nhật thông tin người dùng
  updateUser: async (id, { username, email, password }) => {
    try {
      const [result] = await db.query(
        "UPDATE users SET username = ?, email = ?, password_hash = ? WHERE id = ?",
        [username, email, password, id]
      );
      return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
    } catch (error) {
      throw new Error("Lỗi khi cập nhật người dùng: " + error.message);
    }
  },

  // Xóa người dùng
  deleteUser: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0; // Trả về true nếu xóa thành công
    } catch (error) {
      throw new Error("Lỗi khi xóa người dùng: " + error.message);
    }
  },
};

module.exports = UserModel;
