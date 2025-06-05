import sys
import whisper

audio_path = sys.argv[1]

model = whisper.load_model("base")  # bạn có thể thay bằng "medium", "large" nếu muốn
result = model.transcribe(audio_path)

print(result["text"])
