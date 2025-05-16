const db = require("./db");

const TagModel = {
  getAllTags(callback) {
    db.query("SELECT * FROM tags", callback);
  },

  getTagById(id, callback) {
    db.query("SELECT * FROM tags WHERE id = ?", [id], callback);
  },

  createTag({ name }, callback) {
    db.query("INSERT INTO tags (name) VALUES (?)", [name], callback);
  },

  updateTag(id, { name }, callback) {
    db.query("UPDATE tags SET name = ? WHERE id = ?", [name, id], callback);
  },

  deleteTag(id, callback) {
    db.query("DELETE FROM tags WHERE id = ?", [id], callback);
  },
};

module.exports = TagModel;
