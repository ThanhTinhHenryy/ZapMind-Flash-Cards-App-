const express = require("express");
const deckController = require("../controllers/deckController");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/decks");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });
// Lấy tất cả các deck
router.get("/", deckController.getAllDecks);

// Lấy deck theo ID
router.get("/:id", deckController.getDeckById);

// Tạo deck mới
router.post("/", upload.single("image"), deckController.createDeck);

// Cập nhật deck
router.put("/:id", deckController.updateDeck);

// Xóa deck
router.delete("/:id", deckController.deleteDeck);

// Tìm kiếm deck theo user_id
router.get("/user/:user_id", deckController.getDecksByUserId);

// Tìm kiếm deck theo name
router.get("/search/name", deckController.getDecksByName);

// Tìm kiếm deck theo is_public
router.get("/is_public", deckController.getDecksByIsPublic);
// Lưu một yêu thích
router.post("/save", deckController.saveDeck);

// Unsave a deck
router.delete("/saveDeck/unsaved", deckController.unsaveDeck);

// Get all saved decks by user
router.get("/saved/:user_id", deckController.getSavedDecks);

module.exports = router;
