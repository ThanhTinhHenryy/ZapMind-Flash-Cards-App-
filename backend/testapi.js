import { getAllCards } from "./api.js";
import { login, register } from "./api.js"; // Import thêm các hàm login và register

const test = async () => {
  try {
    // Test tạo card mới
    // Nếu bạn có hàm tạo card, bạn có thể test như sau
    // const newCard = await createCard({...});
    // console.log("Created card:", newCard);

    // Test lấy tất cả card trong deck
    // const cards = await getAllCards(1);
    // console.log("All cards:", cards);

    // Test đăng ký người dùng mới
    // const userData = {
    //   username: "new_user",
    //   password: "password123",
    //   email: "newuser@example.com",
    // };
    // const registeredUser = await register(userData);
    // console.log("Registered user:", registeredUser);

    // Test đăng nhập
    const credentials = {
      email: "user2@example.com",
      password: "123456",
    };
    const loggedInUser = await login(credentials);

    console.log("Logged in user:", loggedInUser);
  } catch (err) {
    console.error("Test failed:", err);
  }
};

test();
