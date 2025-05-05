// data/data.test.ts

export const setImages = {
  science: "https://example.com/image1.jpg",
  history: "https://example.com/image2.jpg",
  geography: "https://example.com/image3.jpg",
  ronaldo: require("../assets/images/set_ex.jpg"), // Local image
};

export const testSets = [
  {
    id: 1,
    titleSet: "Từ vựng TOEIC cơ bản",
    creator: "Mr. John",
    cards: 20,
    imageUrl: setImages.ronaldo,
  },
  {
    id: 2,
    titleSet: "Lịch sử Việt Nam",
    creator: "Cô Mai",
    cards: 15,
    imageUrl: setImages.ronaldo,
  },
  {
    id: 3,
    titleSet: "Thuật ngữ IT",
    creator: "Admin IT",
    cards: 30,
    imageUrl: setImages.ronaldo,
  },
  {
    id: 4,
    titleSet: "Ronaldo",
    creator: "Messi",
    cards: 730,
    imageUrl: setImages.ronaldo,
  },
  {
    id: 5,
    titleSet: "Essential Words",
    creator: "You",
    cards: 9,
    imageUrl: setImages.ronaldo,
  },
];

export const sampleCards = [
  {
    id: 1,
    id_set: 5,
    word: "Apple",
    meaning: "Quả táo",
    image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
  },
  {
    id: 2,
    id_set: 5,
    word: "Cat",
    meaning: "Con mèo",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 3,
    id_set: 5,
    word: "Dog",
    meaning: "Con chó",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 4,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 5,
    id_set: 6,
    word: "Cat",
    meaning: "Con mèo",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },

  {
    id: 5,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 6,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 7,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 8,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
  {
    id: 9,
    id_set: 5,
    word: "Dick",
    meaning: "Con Cặc",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
  },
];
