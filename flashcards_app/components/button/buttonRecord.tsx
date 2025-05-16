// import Voice from "@react-native-voice/voice";
// import { useState } from "react";
// const buttonRecord = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [spokenText, setSpokenText] = useState("");

//   useEffect(() => {
//     Voice.onSpeechResults = (result) => {
//       setSpokenText(result.value[0]); // Lấy text đầu tiên nhận được
//     };

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const startListening = async () => {
//     try {
//       setSpokenText("");
//       setIsListening(true);
//       await Voice.start("en-US");
//     } catch (e) {
//       console.error("Voice error:", e);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (e) {
//       console.error("Stop error:", e);
//     }
//   };
//   return <></>;
// };

// export default buttonRecord;
