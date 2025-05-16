// import { COLORS } from "@/constants/theme";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity } from "react-native";

// type Props = {
//   context: string;
//   nameAns: string;
//   onPress: () => void;
// };

// const ButtonAns = ({ context, onPress, nameAns }: Props) => {
//   return (
//     // <TouchableOpacity style={styles.button} onPress={onPress}>
//     //   <Text style={styles.text}>{nameAns}</Text>
//     //   <Text style={styles.context}>{context}</Text>
//     // </TouchableOpacity>
//     // Co dinh chieu cao 90
//     <TouchableOpacity style={[styles.button, { height: 90 }]} onPress={onPress}>
//       <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
//         {context}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: "#c3b6b6",
//     paddingVertical: 8,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     marginVertical: 5,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: "#fff",
//     minHeight: 60,
//   },
//   text: {
//     fontSize: 10,
//     color: COLORS.white,
//     fontWeight: "bold",
//     flexWrap: "wrap",
//   },
//   context: {
//     fontSize: 10,
//     color: COLORS.white,
//     marginTop: 4,
//     textAlign: "center",
//     flexWrap: "wrap",
//     width: "100%",
//   },
// });

// export default ButtonAns;
import { COLORS } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  nameAns: string;
  context: string;
  onPress: () => void;
};

const ButtonAns = ({ nameAns, context, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{nameAns}.</Text>
      <Text style={styles.context}>{context}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c3b6b6",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#fff",
    minHeight: 60,
  },
  text: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: "bold",
  },
  context: {
    fontSize: 10,
    color: COLORS.white,
    marginTop: 4,
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
  },
});

export default ButtonAns;
