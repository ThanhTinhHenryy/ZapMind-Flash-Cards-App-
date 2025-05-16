const DeckModel = require("../models/deck");

const DeckService = {
  // Lấy tất cả các deck
  getAllDecks: async () => {
    try {
      const decks = await DeckModel.getAllDecks();
      return decks;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách các deck.");
    }
  },

  // Lấy một deck theo ID
  getDeckById: async (id) => {
    try {
      const deck = await DeckModel.getDeckById(id);
      if (!deck) {
        throw new Error("Deck không tồn tại.");
      }
      return deck;
    } catch (error) {
      throw new Error("Lỗi khi lấy deck.");
    }
  },

  // Tạo deck mới
  createDeck: async ({ user_id, name, description, is_public, image_url }) => {
    try {
      const newDeck = await DeckModel.createDeck({
        user_id,
        name,
        description,
        is_public,
        image_url,
      });
      return newDeck;
    } catch (error) {
      throw new Error("Lỗi khi tạo deck.");
    }
  },

  // Cập nhật deck
  updateDeck: async (id, { name, description, is_public, image_url }) => {
    try {
      const updatedDeck = await DeckModel.updateDeck(id, {
        name,
        description,
        is_public,
        image_url,
      });
      if (!updatedDeck) {
        throw new Error("Deck không tồn tại.");
      }
      return updatedDeck;
    } catch (error) {
      throw new Error("Lỗi khi cập nhật deck.");
    }
  },

  // Xóa deck
  deleteDeck: async (id) => {
    try {
      const result = await DeckModel.deleteDeck(id);
      if (!result.deleted) {
        throw new Error("Lỗi khi xóa deck.");
      }
      return { message: "Deck đã được xóa thành công." };
    } catch (error) {
      throw new Error("Lỗi khi xóa deck.");
    }
  },

  // Tìm kiếm deck theo user_id
  getDecksByUserId: async (user_id) => {
    try {
      const decks = await DeckModel.getDecksByUserId(user_id);
      return decks;
    } catch (error) {
      throw new Error("Lỗi khi tìm kiếm deck theo user_id.");
    }
  },

  // Tìm kiếm deck theo name
  getDecksByName: async (name) => {
    try {
      const decks = await DeckModel.getDecksByName(name);
      return decks;
    } catch (error) {
      throw new Error("Lỗi khi tìm kiếm deck theo tên.");
    }
  },

  // Tìm kiếm deck theo is_public
  getDecksByIsPublic: async (is_public) => {
    try {
      const decks = await DeckModel.getDecksByIsPublic(is_public);
      return decks;
    } catch (error) {
      throw new Error("Lỗi khi tìm kiếm deck theo is_public.");
    }
  },
  saveDeck: async (userId, deckId) => {
    return await DeckModel.saveDeckForUser(userId, deckId);
  },

  unsaveDeck: async (userId, deckId) => {
    return await DeckModel.unsaveDeckForUser(userId, deckId);
  },

  getSavedDecks: async (userId) => {
    return await DeckModel.getSavedDecksByUser(userId);
  },
};

module.exports = DeckService;
