const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { newUser, token } = await authService.register({
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "Đăng ký thành công!", user: newUser, token });
    console.log("dki thanh cong");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("dki that bai");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ message: "Đăng nhập thành công!", user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
