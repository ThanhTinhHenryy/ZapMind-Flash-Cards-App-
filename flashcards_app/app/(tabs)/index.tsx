import { Text, View } from "react-native";
import { styles } from "../../styles/auth.style";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "red",
        }}
      >
        Home Screen
      </Text>
      {/* <Link href={"/notification"}>Feeds screen in tabs</Link> */}
    </View>
  );
}
