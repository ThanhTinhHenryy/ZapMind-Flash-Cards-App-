const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.193.121:5000/api";

export const fetchDecks = async (userId) => {
  try {
    console.log("ggoi feth dech", userId);

    const response = await fetch(`${API_BASE_URL}/decks/user/${userId}`);

    if (!response.ok) {
      throw new Error("Lỗi khi lấy dữ liệu từ máy chủ");
    }

    const data = await response.json();
    console.log(data);

    return data; // Trả về mảng các set
  } catch (error) {
    console.error("Lỗi fetchDecks:", error);
    throw error;
  }
};
export const getAllDecks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/decks`);
    if (!response.ok) {
      throw new Error("Failed to fetch decks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching decks:", error);
    return [];
  }
};
export const fetchSavedDecks = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/decks/saved/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch saved decks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
export const saveDeck = async (userId, deckId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/decks/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        deck_id: deckId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save deck");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save deck");
  }
};
export const unsaveDeck = async (userId, deckId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/decks/saveDeck/unsaved`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, deck_id: deckId }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to remove bookmark");
    }

    return await res.json();
  } catch (error) {
    console.error("Error unsaving deck:", error);
    throw error;
  }
};
