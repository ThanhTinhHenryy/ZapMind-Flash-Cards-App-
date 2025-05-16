const CardModel = require("../models/card");

const CardService = {
  getAllCards: () => CardModel.getAllCards(),

  getCardById: (id) => CardModel.getCardById(id),

  getCardsByDeckId: (deck_id) => CardModel.getCardsByDeckId(deck_id),

  createCard: ({ deck_id, front_text, back_text, image_url }) =>
    CardModel.createCard({ deck_id, front_text, back_text, image_url }),

  updateCard: (id, { front_text, back_text, image_url }) =>
    CardModel.updateCard(id, { front_text, back_text, image_url }),

  deleteCard: (id) => CardModel.deleteCard(id),
};

module.exports = CardService;
