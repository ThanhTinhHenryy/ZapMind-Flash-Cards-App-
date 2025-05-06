import Header from "@/components/common/Header";
import LoginButton from "@/components/LoginButton";
import CardInSetDiscover from "@/components/ui/CardInSetDiscover";
import { COLORS } from "@/constants/theme";
import { sampleCards } from "@/data/data.test";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const CardPreview = () => {
  // const route = useRoute<any>();
  // const { setId, setTitle } = route.params;

  // ! FIXME: HARDCODE
  const setId = 5;
  const setTitle = "Essential Words";
  const cards = sampleCards.filter((card) => card.id_set === setId);

  const handleLearn = () => {
    console.log(`Bắt đầu học set: ${setTitle}`);
  };

  return (
    <View style={styles.container}>
      <Header title={setTitle} />

      {/* ? KO su dung scrollView */}
      <View style={styles.cardFrame}>
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardInSetDiscover
              word={item.word}
              meaning={item.meaning}
              image={item.image}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ color: "red" }}>No cards found</Text>
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <LoginButton title="Học ngay." onPress={handleLearn} />
        {/* <Button title="Học ngay" onPress={handleLearn} /> */}
      </View>
    </View>
  );
};

export default CardPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 16,
  },
  cardFrame: {
    flex: 1,
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 16,
    gap: 10, // Khoảng cách giữa các card
  },
  flatListContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 16,
    alignItems: "center",
  },
});
