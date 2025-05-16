// import Header from "@/components/common/Header";
// import LoginButton from "@/components/LoginButton";
// import CardInSetDiscover from "@/components/ui/CardInSetDiscover";
// import { COLORS } from "@/constants/theme";
// import { sampleCards } from "@/data/data.test";
// import React from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";

// const CardPreview = () => {
//   // const route = useRoute<any>();
//   // const { setId, setTitle } = route.params;

//   // ! FIXME: HARDCODE
//   const setId = 5;
//   const setTitle = "Essential Words";
//   const cards = sampleCards.filter((card) => card.id_set === setId);

//   const handleLearn = () => {
//     console.log(`Bắt đầu học set: ${setTitle}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Header title={setTitle} />

//       {/* ? KO su dung scrollView */}
//       <View style={styles.cardFrame}>
//         <FlatList
//           data={cards}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <CardInSetDiscover
//               word={item.word}
//               meaning={item.meaning}
//               image={item.image}
//             />
//           )}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           ListEmptyComponent={
//             <Text style={{ color: "red" }}>No cards found</Text>
//           }
//         />
//       </View>

//       <View style={styles.buttonContainer}>
//         <LoginButton title="Học ngay." onPress={handleLearn} />
//         {/* <Button title="Học ngay" onPress={handleLearn} /> */}
//       </View>
//     </View>
//   );
// };

// export default CardPreview;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   contentContainer: {
//     flex: 1,
//     padding: 16,
//     paddingHorizontal: 16,
//   },
//   cardFrame: {
//     flex: 1,
//     margin: 16,
//     marginBottom: 8,
//     backgroundColor: COLORS.surface,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 3,
//     padding: 16,
//   },
//   scrollContent: {
//     paddingBottom: 16,
//     gap: 10, // Khoảng cách giữa các card
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   buttonContainer: {
//     marginTop: 10,
//     marginBottom: 16,
//     alignItems: "center",
//   },
// });

import Header from "@/components/common/Header";
import LoginButton from "@/components/LoginButton";
import CardInSetDiscover from "@/components/ui/CardInSetDiscover";
import { COLORS } from "@/constants/theme";
import { getAllCards } from "@/data/apiCard"; // hàm call API thật
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const CardPreview = () => {
  interface Card {
    id: 1;
    deck_id: 1;
    front_text: "apple";
    back_text: "A round fruit with red or green skin";
    image_url: "";
    created_at: "2025-05-04T02:10:42.000Z";
  }
  const { setId, setTitle } = useLocalSearchParams();
  const numericSetId = Number(setId);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const haveCard = cards.length === 0 ? "false" : "true";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getAllCards(numericSetId);
        setCards(data);
      } catch (error: any) {
        console.error("❌ Lỗi khi fetch cards:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [numericSetId]);

  return (
    <View style={styles.container}>
      <Header title={setTitle.toString()} />

      <View style={styles.cardFrame}>
        {loading ? (
          <Text>Đang tải...</Text>
        ) : (
          <FlatList
            data={cards}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <CardInSetDiscover
                word={item.front_text}
                meaning={item.back_text}
                image={"http://192.168.193.121:5000" + item.image_url || ""}
                onPress={() => {
                  router.push({
                    pathname: "/(create)/UpdateCard",
                    params: { cardId: item.id },
                  });
                }}
              />
            )}
            ListEmptyComponent={
              <Text style={{ color: "red" }}>Không có card nào</Text>
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
      {haveCard === "true" ? (
        <>
          <View style={styles.buttonContainer}>
            <LoginButton
              title="Học ngay"
              onPress={() => {
                router.push({
                  pathname: "/(learn)/LearnCard",
                  params: {
                    setTitle: setTitle,
                    cards: JSON.stringify(cards),
                  },
                });
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <LoginButton
              title="Kiểm tra"
              onPress={() => {
                router.push({
                  pathname: "/(learn)/TestSetCard",
                  params: {
                    setTitle: setTitle,
                    cards: JSON.stringify(cards),
                  },
                });
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <LoginButton
            title="Them card"
            onPress={() =>
              router.push({
                pathname: "/(create)/CreateCard",
                params: { setId: setId, setTitle: setTitle },
              })
            }
          />
        </View>
      )}
    </View>
  );
};

export default CardPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  cardFrame: {
    flex: 1,
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 16,
    alignItems: "center",
  },
});
