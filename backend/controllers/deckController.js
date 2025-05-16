const DeckService = require("../services/deckService");

const deckController = {
  // Lấy tất cả các deck
  getAllDecks: async (req, res) => {
    try {
      const decks = await DeckService.getAllDecks();
      res.status(200).json(decks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Lấy deck theo ID
  getDeckById: async (req, res) => {
    const { id } = req.params;
    try {
      const deck = await DeckService.getDeckById(id);
      if (!deck) {
        return res.status(404).json({ message: "Deck không tồn tại." });
      }
      res.status(200).json(deck);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Tạo deck mới
  createDeck: async (req, res) => {
    const { user_id, name, description, is_public } = req.body;
    console.log(user_id, name, description, is_public);

    const image_url = req.file ? `/uploads/decks/${req.file.filename}` : null;
    console.log("link cua card", image_url);
    try {
      const newDeck = await DeckService.createDeck({
        user_id,
        name,
        description,
        is_public,
        image_url,
      });
      res.status(201).json(newDeck);
      console.log("luu thanh cong desk");
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("luu decks fails");
    }
  },

  // Cập nhật deck
  updateDeck: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updatedDeck = await DeckService.updateDeck(id, { name });
      res.status(200).json(updatedDeck);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Xóa deck
  deleteDeck: async (req, res) => {
    console.log("call xoa deck");

    const { id } = req.params;
    try {
      await DeckService.deleteDeck(id);
      res.status(200).json({ message: "Deck đã được xóa thành công." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Tìm kiếm deck theo user_id
  getDecksByUserId: async (req, res) => {
    const { user_id } = req.params;
    try {
      const decks = await DeckService.getDecksByUserId(user_id);
      console.log(decks);

      res.status(200).json(decks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    console.log("gọi get user");
  },

  // Tìm kiếm deck theo name
  getDecksByName: async (req, res) => {
    console.log("goi toi");

    const { name } = req.query;
    try {
      const decks = await DeckService.getDecksByName(name);
      res.status(200).json(decks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    console.log("gọi get name");
  },

  // Tìm kiếm deck theo is_public
  getDecksByIsPublic: async (req, res) => {
    const { is_public } = req.query;
    try {
      const decks = await DeckService.getDecksByIsPublic(is_public);
      res.status(200).json(decks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  saveDeck: async (req, res) => {
    const { user_id, deck_id } = req.body;
    console.log("da goi save deck", user_id, deck_id);

    try {
      await DeckService.saveDeck(user_id, deck_id);
      res.status(201).json({ message: "Deck saved successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to save deck" });
    }
  },

  // Unsave a deck
  unsaveDeck: async (req, res) => {
    const { user_id, deck_id } = req.body;
    console.log("call toi unsave", user_id, deck_id);

    try {
      await DeckService.unsaveDeck(user_id, deck_id);
      res.status(200).json({ message: "Deck unsaved successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to unsave deck" });
    }
  },

  // Get saved decks for a user
  getSavedDecks: async (req, res) => {
    const { user_id } = req.params;
    try {
      const decks = await DeckService.getSavedDecks(user_id);
      res.status(200).json(decks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch saved decks" });
    }
  },
};

module.exports = deckController;
