import Title from "@/components/common/Title";
import { FlatList, StyleSheet, View } from "react-native";
// import { styles } from "../../styles/auth.style";
import SetHome from "@/components/ui/SetHome";
import { COLORS } from "@/constants/theme";
import { testSets } from "@/data/data.test";
import { useRouter } from "expo-router";

export default function Index() {
  // ! HardCode
  const set = testSets;
  // const navigation = useNavigation();
  // const setId = 5;
  const user = {
    name: "Yarushi",
  };
  const router = useRouter();
  // const handleView = () => {
  //   // navigation.navigate("(learn)/LearnCard", { setId: item.id });
  //   router.push({
  //     pathname: "(learn)/LearnCard",
  //     params: { setId: item.id },
  //   });
  // };
  return (
    <View style={styles.container}>
      <Title textTitle={`Set của ${user?.name || "bạn"}`} />
      <View style={styles.setFrame}>
        <FlatList
          data={set}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SetHome
              titleSet={item.titleSet}
              creator={item.creator}
              cards={item.cards}
              imageUrl={item.imageUrl}
              onPressView={() =>
                router.push({
                  pathname: "/(learn)/LearnCard",
                  params: { setId: item.id },
                })
              }
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  setFrame: {
    padding: 16,
  },
});
