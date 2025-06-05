const express = require("express");
const multer = require("multer");
const whisperController = require("../controllers/whisperController");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // Lưu file tạm

router.post(
  "/transcribe",
  upload.single("audio"),
  whisperController.transcribeAudio
);

module.exports = router;

// // routes/whisperRoutes.js
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const whisperController = require("../controllers/whisperController"); // Đảm bảo đúng path

// // Multer setup
// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// router.post(
//   "/transcribe",
//   upload.single("audio"),
//   whisperController.transcribeAudio
// );

// module.exports = router;
