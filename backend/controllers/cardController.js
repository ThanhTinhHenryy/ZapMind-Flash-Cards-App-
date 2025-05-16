const CardService = require("../services/cardService");
const fs = require("fs");
const path = require("path");

const cardController = {
  getAllCards: async (req, res) => {
    try {
      const cards = await CardService.getAllCards();
      res.json(cards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getCardById: async (req, res) => {
    try {
      const card = await CardService.getCardById(req.params.id);
      res.json(card);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getCardsByDeckId: async (req, res) => {
    try {
      const cards = await CardService.getCardsByDeckId(req.params.deck_id);
      res.json(cards);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createCard: async (req, res) => {
    try {
      const { deck_id, front_text, back_text } = req.body;
      const image_url = req.file ? `/uploads/cards/${req.file.filename}` : null;
      console.log("link cua card", image_url);

      const newCard = await CardService.createCard({
        deck_id,
        front_text,
        back_text,
        image_url,
      });

      res.status(201).json(newCard);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateCard: async (req, res) => {
    console.log("gọi update card controller");

    try {
      const { front_text, back_text } = req.body;
      const cardId = req.params.id;
      console.log(front_text, back_text, cardId);

      // 1. Lấy thông tin card cũ
      const existingCard = await CardService.getCardById(cardId);
      if (!existingCard) {
        return res.status(404).json({ message: "Card không tồn tại" });
      }

      // 2. Nếu có ảnh mới => xóa ảnh cũ
      let image_url = existingCard.image_url; // giữ ảnh cũ mặc định
      if (req.file) {
        // Xóa ảnh cũ nếu tồn tại
        if (existingCard.image_url) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            existingCard.image_url
          );
          fs.unlink(oldImagePath, (err) => {
            if (err) console.warn("Không thể xóa ảnh cũ:", err.message);
          });
        }
        console.log("xóa ảnh thành công");

        // Cập nhật ảnh mới
        image_url = `/uploads/cards/${req.file.filename}`;
        console.log("link của img card", image_url);
      }

      // 3. Cập nhật card
      const updatedCard = await CardService.updateCard(cardId, {
        front_text,
        back_text,
        image_url,
      });

      res.json(updatedCard);
      console.log("cập nhật thành công");
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const result = await CardService.deleteCard(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = cardController;
