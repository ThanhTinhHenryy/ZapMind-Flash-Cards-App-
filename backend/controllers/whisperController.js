const { runWhisper } = require("../Whisper/transcribe");

exports.transcribeAudio = async (req, res) => {
  try {
    const audioPath = req.file.path; // Lấy path từ file upload
    const result = await runWhisper(audioPath);
    res.json({ text: result });
    console.log("Transcription result:", result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

// // controllers/whisperController.js
// const { spawn } = require("child_process");
// const path = require("path");
// const fs = require("fs");

// exports.transcribeAudio = (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No audio file uploaded" });
//   }

//   const audioPath = path.resolve(req.file.path); // <== Dùng req.file.path
//   const python = spawn("python", ["Whisper/whisper_script.py", audioPath]);

//   let result = "";
//   let error = "";

//   python.stdout.on("data", (data) => (result += data));
//   python.stderr.on("data", (data) => (error += data));

//   python.on("close", (code) => {
//     fs.unlinkSync(audioPath); // Xóa file sau khi xử lý
//     if (code !== 0) {
//       console.error("Python error:", error);
//       return res.status(500).json({ error: "Whisper failed", details: error });
//     }

//     try {
//       const json = JSON.parse(result);
//       res.json(json);
//     } catch (e) {
//       res
//         .status(500)
//         .json({ error: "Failed to parse Whisper result", raw: result });
//     }
//   });
// };
