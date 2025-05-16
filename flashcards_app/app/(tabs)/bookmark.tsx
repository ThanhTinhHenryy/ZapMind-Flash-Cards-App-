// import Title from "@/components/common/Title";
// import SearchBar from "@/components/ui/SearchBar";
// import SetBookmark from "@/components/ui/SetBookmark";
// import { COLORS } from "@/constants/theme";
// import { testSets } from "@/data/data.test";
// import React, { useState } from "react";
// import { ScrollView, StyleSheet, View } from "react-native";

// export default function Bookmark() {
//   const [searchText, setSearchText] = useState("");

//   // ? Bookmark sẽ lưu tất cả bookmark được user lưu bên discover hoặc đc ng dùng tạo

//   // * Search
//   const handleSearch = () => {
//     console.log("Searching:", searchText);
//   };
//   // * Add hoăc xóa
//   const handleAdd = (title: string) => {
//     console.log(`Thêm set: ${title}`);
//   };
//   // * Press
//   const handlePreview = (title: string) => {
//     console.log(`Preview Set: ${title}`);
//   };
//   return (
//     <View style={styles.discoverScreen}>
//       <Title textTitle="Discover" />
//       <SearchBar
//         value={searchText}
//         onChangeText={setSearchText}
//         onSearch={handleSearch}
//       />
//       {/* Doi thanh flatlist */}
//       <ScrollView contentContainerStyle={styles.setList}>
//         {testSets.map((item, index) => (
//           <SetBookmark
//             key={index}
//             titleSet={item.titleSet}
//             creator={item.creator}
//             cards={item.cards}
//             imageUrl={item.imageUrl}
//             onPressAdd={() => handleAdd(item.titleSet)}
//             onPressPreview={() => handlePreview(item.titleSet)}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   discoverScreen: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   setList: {
//     paddingVertical: 12,
//   },
// });
// import Title from "@/components/common/Title";
// import SearchBar from "@/components/ui/SearchBar";
// import SetBookmark from "@/components/ui/SetBookmark";
// import { COLORS } from "@/constants/theme";
// import { getUser } from "@/data/userStore";
// import { fetchSavedDecks } from "data/apiDeck"; // Import hàm fetch từ apiDeck
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";

// export default function Bookmark() {
//   const [searchText, setSearchText] = useState("");
//   const [savedDecks, setSavedDecks] = useState<any[]>([]); // Thêm state để lưu decks đã lưu
//   const [loading, setLoading] = useState<boolean>(true); // Thêm state để kiểm soát trạng thái loading

//   // Lấy dữ liệu saved decks từ API khi trang được render
//   useEffect(() => {
//     const fetchDecks = async () => {
//       try {
//         const userId = getUser().id; // Thay userId này theo cách của bạn
//         const data = await fetchSavedDecks(userId);
//         console.log(data);

//         setSavedDecks(data);
//       } catch (error) {
//         console.error("Error fetching saved decks:", error);
//       } finally {
//         setLoading(false); // Khi xong, tắt loading
//       }
//     };

//     fetchDecks();
//   }, []); // Chạy 1 lần khi component mount

//   // * Search
//   const handleSearch = () => {
//     console.log("Searching:", searchText);
//   };

//   // * Add hoăc xóa
//   const handleAdd = (title: string) => {
//     console.log(`Thêm set: ${title}`);
//   };

//   // * Press
//   const handlePreview = (item: any) => {
//     router.push({
//       pathname: "/(set)/CardPreview",
//       params: { setId: item.id, setTitle: item.name },
//     });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.discoverScreen}>
//       <Title textTitle="Bookmark" />
//       <SearchBar
//         value={searchText}
//         onChangeText={setSearchText}
//         onSearch={handleSearch}
//       />
//       {/* Doi thanh flatlist */}
//       <ScrollView contentContainerStyle={styles.setList}>
//         {savedDecks.length > 0 ? (
//           savedDecks.map((item, index) => (
//             <SetBookmark
//               key={index}
//               titleSet={item.name}
//               creator={item.user_id}
//               cards={item.cards} // Chú ý là bạn cần xử lý dữ liệu card sao cho phù hợp
//               imageUrl={item.imageUrl} // Nếu có
//               onPressAdd={() => handleAdd(item.name)}
//               onPressPreview={() => handlePreview(item)}
//             />
//           ))
//         ) : (
//           <View>
//             <Text>No bookmarks found.</Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   discoverScreen: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   setList: {
//     paddingVertical: 12,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: COLORS.background,
//   },
// });

import Title from "@/components/common/Title";
import SearchBar from "@/components/ui/SearchBar";
import SetBookmark from "@/components/ui/SetBookmark";
import { COLORS } from "@/constants/theme";
import { getUser } from "@/data/userStore";
import { fetchSavedDecks, unsaveDeck } from "data/apiDeck";
import { router, useFocusEffect } from "expo-router"; // 👈 dùng hook này
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Bookmark() {
  interface Decks {
    id: 6;
    user_id: 9;
    name: "Vnp";
    description: "Vnp";
    is_public: 0;
    created_at: "2025-05-07T10:34:04.000Z";
    image_url: "/uploads/decks/image-1746614044106-672386838.jpeg";
    email: "";
    sl: 0;
  }
  const [searchText, setSearchText] = useState("");
  const [savedDecks, setSavedDecks] = useState<Decks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Sử dụng useFocusEffect để load lại data mỗi lần người dùng vào trang
  useFocusEffect(
    useCallback(() => {
      const fetchDecks = async () => {
        try {
          setLoading(true);
          const userId = getUser().id;
          const data = await fetchSavedDecks(userId);

          setSavedDecks(data);
        } catch (error) {
          console.error("Error fetching saved decks:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDecks();
    }, [])
  );

  const handleSearch = () => {
    console.log("Searching:", searchText);
  };

  const handleRemove = (userId: number, deckId: number) => {
    Alert.alert(
      "Xác nhận xoá",
      "Bạn có chắc muốn xoá bộ thẻ này khỏi Bookmark?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            try {
              const data = await unsaveDeck(userId, deckId);
              console.log("Unsave thành công:", data);
              // Cập nhật lại danh sách sau khi xoá
              setSavedDecks((prev) =>
                prev.filter((deck) => deck.id !== deckId)
              );
            } catch (error) {
              console.error("Lỗi khi unsave:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handlePreview = (item: any) => {
    router.push({
      pathname: "/(set)/CardPreview",
      params: { setId: item.id, setTitle: item.name },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.discoverScreen}>
      <Title textTitle="Bookmark" />
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSearch={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.setList}>
        {savedDecks.length > 0 ? (
          savedDecks.map((item, index) => (
            <SetBookmark
              key={index}
              titleSet={item.name}
              creator={item.email.split("@")[0]}
              cards={item.sl}
              imageUrl={"http://192.168.193.121:5000" + item.image_url || ""}
              onPressAdd={() => handleRemove(getUser().id, item.id)}
              onPressPreview={() => handlePreview(item)}
            />
          ))
        ) : (
          <View>
            <Text>No bookmarks found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  discoverScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  setList: {
    paddingVertical: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});
