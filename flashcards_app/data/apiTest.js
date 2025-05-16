// testCardApi.js
import { fetchSavedDecks } from "./apiDeck.js";

// 🧪 Test cứng
const test = async () => {
  try {
    //   // // 1. Tạo card mới
    //   const newCard = await createCard({
    //     deckId: 2, // thay bằng ID thật từ DB
    //     frontText: "What is the capital of France?",
    //     backText: "Paris",
    //     image: null, // hoặc null
    //   });
    //   console.log("✅ Tạo card:", newCard);

    //   // 2. Lấy toàn bộ cards trong deck
    //   const cards = await getAllCards(2); // deckId
    //   console.log("📚 Cards trong deck:", cards);

    //   //     // 3. Cập nhật card
    //   const updated = await updateCard(newCard.id, {
    //     frontText: "Capital of France?",
    //     backText: "It's Paris",
    //     image: null,
    //   });
    //   console.log("✏️ Cập nhật card:", updated);

    //   // 4. Xoá card
    //   const deleted = await deleteCard(newCard.id);
    //   console.log("🗑️ Đã xoá card:", deleted);

    //   const data = await getAllCards(2); // deckId
    //   console.log("📚 Cards trong deck:", data);
    const data = await fetchSavedDecks(8);
    console.log(data);
  } catch (err) {
    console.error("❌ Test thất bại:", err.message);
  }
};

test();
