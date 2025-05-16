const express = require("express");
const multer = require("multer");
const path = require("path");
const cardController = require("../controllers/cardController");

const router = express.Router();

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/cards");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", cardController.getAllCards);
router.get("/:id", cardController.getCardById);
router.get("/deck/:deck_id", cardController.getCardsByDeckId);
router.post("/", upload.single("image"), cardController.createCard);
router.put("/:id", upload.single("image"), cardController.updateCard);
router.delete("/:id", cardController.deleteCard);

module.exports = router;
