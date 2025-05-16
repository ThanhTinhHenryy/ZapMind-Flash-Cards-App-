const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const authService = {
  // Đăng ký người dùng mới
  register: async ({ email, password }) => {
    // Kiểm tra xem email đã tồn tại trong database chưa
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new Error("Email đã được đăng ký.");
    }

    // Mã hóa password trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = await UserModel.createUser({
      email,
      password: hashedPassword,
    });

    // Tạo JWT token sau khi đăng ký thành công
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // Ví dụ: '1d'
      }
    );

    return { newUser, token }; // Trả về user mới và token
  },

  // Đăng nhập người dùng
  login: async (email, password) => {
    // Kiểm tra xem email có tồn tại trong database không
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error("Email không đúng.");
    }
    console.log(user);
    // Kiểm tra mật khẩu người dùng
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("mật khẩu không đúng.");
    }

    // Tạo JWT token sau khi đăng nhập thành công
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // Ví dụ: '1d'
      }
    );

    return { user, token }; // Trả về user và token
  },

  // Kiểm tra token hợp lệ
  verifyToken: async (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // Trả về thông tin user đã giải mã từ token
    } catch (error) {
      throw new Error("Token không hợp lệ.");
    }
  },
};

module.exports = authService;
