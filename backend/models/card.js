const db = require("./db");

const CardModel = {
  getAllCards: async () => {
    const [rows] = await db.query("SELECT * FROM cards");
    return rows;
  },

  getCardById: async (id) => {
    const [rows] = await db.query("SELECT * FROM cards WHERE id = ?", [id]);
    return rows[0];
  },

  createCard: async ({ deck_id, front_text, back_text, image_url }) => {
    const [result] = await db.query(
      "INSERT INTO cards (deck_id, front_text, back_text, image_url) VALUES (?, ?, ?, ?)",
      [deck_id, front_text, back_text, image_url]
    );
    return { id: result.insertId, deck_id, front_text, back_text, image_url };
  },

  updateCard: async (id, { front_text, back_text, image_url }) => {
    await db.query(
      "UPDATE cards SET front_text = ?, back_text = ?, image_url = ? WHERE id = ?",
      [front_text, back_text, image_url, id]
    );
    return { id, front_text, back_text, image_url };
  },

  deleteCard: async (id) => {
    await db.query("DELETE FROM cards WHERE id = ?", [id]);
    return { deleted: true };
  },

  getCardsByDeckId: async (deck_id) => {
    const [rows] = await db.query("SELECT * FROM cards WHERE deck_id = ?", [
      deck_id,
    ]);
    return rows;
  },
};

module.exports = CardModel;
