// import Title from "@/components/common/Title";
// import { FlatList, StyleSheet, View } from "react-native";
// // import { styles } from "../../styles/auth.style";
// import SetHome from "@/components/ui/SetHome";
// import { COLORS } from "@/constants/theme";
// import { testSets } from "@/data/data.test";
// import { getUser } from "@/data/userStore";
// import { useRouter } from "expo-router";

// export default function Index() {
//   // ! HardCode
//   const set = testSets;
//   // const navigation = useNavigation();
//   // const setId = 5;
//   const user = {
//     name: "Yarushi",
//   };
//   user.name = getUser().name;
//   const router = useRouter();
//   // const handleView = () => {
//   //   // navigation.navigate("(learn)/LearnCard", { setId: item.id });
//   //   router.push({
//   //     pathname: "(learn)/LearnCard",
//   //     params: { setId: item.id },
//   //   });
//   // };
//   return (
//     <View style={styles.container}>
//       <Title textTitle={`Set của ${user?.name || "bạn"}`} />
//       <View style={styles.setFrame}>
//         <FlatList
//           data={set}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <SetHome
//               titleSet={item.titleSet}
//               creator={item.creator}
//               cards={item.cards}
//               imageUrl={item.imageUrl}
//               onPressView={() =>
//                 router.push({
//                   pathname: "/(learn)/LearnCard",
//                   params: { setId: item.id },
//                 })
//               }
//             />
//           )}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background },
//   setFrame: {
//     padding: 16,
//   },
// });

import Title from "@/components/common/Title";
import SetHome from "@/components/ui/SetHome";
import { COLORS } from "@/constants/theme";
import { getUser } from "@/data/userStore";
import { fetchDecks } from "data/apiDeck";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

interface Deck {
  id: 2;
  user_id: 1;
  name: "Daily Verbs";
  description: "Everyday English verbs";
  is_public: 0;
  created_at: "2025-05-04T02:10:42.000Z";
  image_url: "";
  sl: 0;
}

export default function Index() {
  const [sets, setSets] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = getUser();
  const userId = user.id; // Sửa lại nếu bạn lấy userId từ login

  useEffect(() => {
    const getDecks = async () => {
      try {
        const data = await fetchDecks(userId);
        console.log(data);

        setSets(data);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tải dữ liệu bộ từ vựng.");
      } finally {
        setLoading(false);
      }
    };

    getDecks();
  }, []);

  return (
    <View style={styles.container}>
      <Title textTitle="Set của bạn" />
      <View style={styles.setFrame}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={sets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <SetHome
                titleSet={item.name}
                creator={user.name}
                cards={item.sl}
                imageUrl={"http://192.168.193.121:5000" + item.image_url || ""}
                onPressView={() =>
                  router.push({
                    pathname: "/(set)/CardPreview",
                    params: { setId: item.id, setTitle: item.name },
                  })
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  setFrame: { padding: 16 },
});
