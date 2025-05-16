const db = require("./db");

const DeckModel = {
  // Lấy tất cả các deck
  getAllDecks: async () => {
    const [rows] = await db.query(
      "SELECT decks.*, COUNT(cards.id) AS sl FROM decks LEFT JOIN cards ON decks.id = cards.deck_id GROUP BY decks.id;"
    );
    console.log(rows);

    return rows;
  },

  // Lấy một deck theo ID
  getDeckById: async (id) => {
    const [rows] = await db.query("SELECT * FROM decks WHERE id = ?", [id]);
    return rows[0]; // chỉ lấy 1 record
  },

  // Tạo deck mới
  createDeck: async ({ user_id, name, description, is_public, image_url }) => {
    console.log("model", user_id, name, description, is_public, image_url);

    const [result] = await db.query(
      "INSERT INTO decks (user_id, name,description,is_public,image_url) VALUES (?,?,?,?,?)",
      [user_id, name, description, is_public, image_url]
    );
    return {
      id: result.insertId,
      user_id,
      name,
      description,
      is_public,
      image_url,
    };
  },

  // Cập nhật deck
  updateDeck: async (id, { name, description, is_public, image_url }) => {
    await db.query(
      `UPDATE decks 
       SET name = ?, description = ?, is_public = ?, image_url = ? 
       WHERE id = ?`,
      [name, description, is_public, image_url, id]
    );
    return { id, name, description, is_public, image_url };
  },

  // Xóa deck
  deleteDeck: async (id) => {
    await db.query("DELETE FROM decks WHERE id = ?", [id]);
    return { deleted: true };
  },

  // Tìm kiếm deck theo user_id
  getDecksByUserId: async (user_id) => {
    const [rows] = await db.query(
      "SELECT   decks.*,   COUNT(cards.id) sl FROM decks LEFT JOIN cards ON decks.id = cards.deck_id WHERE decks.user_id = ? GROUP BY decks.id;",
      [user_id]
    );
    return rows;
  },

  // Tìm kiếm deck theo name
  getDecksByName: async (name) => {
    const [rows] = await db.query("SELECT * FROM decks WHERE name LIKE ?", [
      `%${name}%`,
    ]);
    return rows;
  },

  // Tìm kiếm deck theo is_public
  getDecksByIsPublic: async (is_public) => {
    const [rows] = await db.query("SELECT * FROM decks WHERE is_public = ?", [
      is_public,
    ]);
    return rows;
  },
  saveDeckForUser: async (userId, deckId) => {
    const [result] = await db.execute(
      "INSERT INTO saved_decks (user_id, deck_id) VALUES (?, ?)",
      [userId, deckId]
    );
    return result;
  },

  unsaveDeckForUser: async (userId, deckId) => {
    console.log("gọi model unsavedeck");

    const [result] = await db.execute(
      "DELETE FROM saved_decks WHERE user_id = ? AND deck_id = ?",
      [userId, deckId]
    );
    console.log("DELETE FROM saved_decks WHERE user_id = ? AND deck_id = ?", [
      userId,
      deckId,
    ]);

    return result;
  },

  getSavedDecksByUser: async (userId) => {
    const [rows] = await db.execute(
      `SELECT 
         d.*, 
         u.email, 
         COUNT(c.id) AS sl
       FROM saved_decks sd
       JOIN decks d ON sd.deck_id = d.id
       JOIN users u ON d.user_id = u.id
       LEFT JOIN cards c ON d.id = c.deck_id
       WHERE sd.user_id = ?
       GROUP BY d.id, u.email`,
      [userId]
    );
    return rows;
  },
};

module.exports = DeckModel;
