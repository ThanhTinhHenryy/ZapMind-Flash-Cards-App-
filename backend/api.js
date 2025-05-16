const API_BASE_URL = "http://192.168.123.14:5000/api"; // Đổi thành địa chỉ backend của bạn

// Lấy tất cả flashcard trong một deck
export const getAllCards = async (deckId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cards/deck/${deckId}`);
    if (!res.ok) throw new Error("Failed to fetch cards");
    return await res.json();
  } catch (err) {
    console.error("Error in getAllCards:", err);
    throw err;
  }
};

export const register = async (userData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Ex: { username, password, email }
    });

    if (!res.ok) throw new Error("Failed to register user");
    return await res.json(); // Trả về dữ liệu người dùng hoặc token nếu cần
  } catch (err) {
    console.error("Error in register:", err);
    throw err;
  }
};

// Đăng nhập người dùng
export const login = async (credentials) => {
  console.log(JSON.stringify(credentials));

  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Ex: { username, password }
    });

    if (!res.ok) throw new Error("Failed to login");
    return await res.json(); // Trả về token hoặc thông tin người dùng
  } catch (err) {
    console.error("Error in login:", err);
    throw err;
  }
};
