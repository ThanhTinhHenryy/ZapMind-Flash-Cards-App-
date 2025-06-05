// voiceApi.js

const BASE_URL = "http://192.168.26.121:5000";

export async function transcribeAudio(audioFile) {
  try {
    if (!audioFile?.uri) {
      throw new Error("audioFile không hợp lệ");
    }

    const uriParts = audioFile.uri.split("/");
    const fileName = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("audio", {
      uri: audioFile.uri,
      name: fileName || "audio.wav",
      type: "audio/wav",
    });

    const response = await fetch(`${BASE_URL}/api/whisper/transcribe`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Lỗi API: ${response.status} - ${text}`);
    }

    const data = await response.json();
    console.log("✅ Kết quả transcribeAudio:", data);

    // Trả về chuỗi, ưu tiên transcript, sau đó text
    return data.transcript || data.text || "";
  } catch (error) {
    console.error("❌ Lỗi transcribeAudio:", error.message);
    throw error;
  }
}
