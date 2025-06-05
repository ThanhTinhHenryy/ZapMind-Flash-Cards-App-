const path = require("path");
const { spawn } = require("child_process");

// Đường dẫn python trong virtual environment
const pythonPath = "C:\\Users\\Acer\\whisper-gpu-env\\Scripts\\python.exe"; // Đảm bảo đúng đường dẫn
const scriptPath = path.join(__dirname, "whisper_script.py");

function runWhisper(audioPath) {
  return new Promise((resolve, reject) => {
    const pyProcess = spawn(pythonPath, [scriptPath, audioPath]);

    let result = "";
    let error = "";

    pyProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pyProcess.on("close", (code) => {
      if (code === 0) {
        resolve(result.trim());
      } else {
        reject(`Python error: ${error}`);
      }
    });
  });
}

module.exports = { runWhisper };
