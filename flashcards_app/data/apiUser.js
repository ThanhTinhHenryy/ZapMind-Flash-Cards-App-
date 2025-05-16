// api/apiUser.js
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.193.121:5000/api";

export const loginUser = async ({ email, password }) => {
  console.log(API_BASE_URL);

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    return data; // Trả dữ liệu về cho phía gọi xử lý tiếp
  } catch (err) {
    console.error("Lỗi loginUser:", err);
    throw err;
  }
};

// Đăng ký user mới
export const registerUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }

    return data; // Trả dữ liệu về cho phía gọi xử lý tiếp
  } catch (err) {
    console.error("Lỗi registerUser:", err);
    throw err;
  }
};
