// import * as ImagePicker from "expo-image-picker";
// import React, { useState } from "react";
// import { Button, Image, ScrollView, Text } from "react-native";
// import Tesseract from "tesseract.js";

// export default function DetectImage() {
//   const [image, setImage] = useState(null);
//   const [words, setWords] = useState<string[]>([]);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       base64: true,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setImage(uri);
//       recognizeText(uri);
//     }
//   };

//   const recognizeText = async (uri: string) => {
//     const res = await fetch(uri);
//     const blob = await res.blob();

//     const { data } = await Tesseract.recognize(blob, "eng", {
//       logger: (m) => console.log(m),
//     });

//     const text = data.text;
//     const wordArray = text.split(/\s+/);
//     setWords(wordArray);
//   };

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       <Button title="Chọn ảnh" onPress={pickImage} />
//       {image && (
//         <Image
//           source={{ uri: image }}
//           style={{ width: "100%", height: 200, marginTop: 10 }}
//         />
//       )}
//       <Text style={{ marginTop: 10 }}>Các từ nhận diện được:</Text>
//       {words.map((w, i) => (
//         <Text key={i}>{w}</Text>
//       ))}
//     </ScrollView>
//   );
// }
