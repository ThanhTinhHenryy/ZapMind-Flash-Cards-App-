// data/data.test.ts

export const setImages = {
  science: "https://example.com/image1.jpg",
  history: "https://example.com/image2.jpg",
  geography: "https://example.com/image3.jpg",
  ronaldo: require("../assets/images/set_ex.jpg"), // Local image
};
export const testimg = {
  batman: require("../assets/images/cards/batman_surrounded_by_bats-wallpaper-2560x1600.jpg"),
  car: require("../assets/images/cards/bmw-m4-coupe-2560x1440-10681.jpg"),
  baydi: require("../assets/images/cards/cristiano-ronaldo-2024-vn-2560x1600.jpg"),
  real: require("../assets/images/cards/real-madrid-cf-5k-2560x1440-15505.jpg"),
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
  {
    id: 6,
    titleSet: "Basic English",
    creator: "Nguyễn Văn A",
    cards: 20,
    imageUrl: "https://example.com/image1.jpg",
  },
  {
    id: 7,
    titleSet: "Advanced Words",
    creator: "Trần Thị B",
    cards: 35,
    imageUrl: "https://example.com/image2.jpg",
  },
  {
    id: 8,
    titleSet: "Advanced Words",
    creator: "Trần Thị B",
    cards: 35,
    imageUrl: "https://example.com/image2.jpg",
  },
  {
    id: 9,
    titleSet: "Advanced Words",
    creator: "Trần Thị B",
    cards: 35,
    imageUrl: "https://example.com/image2.jpg",
  },
  {
    id: 10,
    titleSet: "Animals Basic",
    creator: "GPT vợ yêu",
    cards: 5,
    imageUrl: setImages.science, // dùng ảnh mạng cho tiện
  },
  {
    id: 11,
    titleSet: "test ne",
    creator: "GPT vợ yêu",
    cards: 4,
    imageUrl: setImages.ronaldo, // dùng ảnh mạng cho tiện
  },
];

export const sampleCards = [
  {
    id: 1,
    id_set: 6,
    word: "apple",
    meaning: "quả táo",

    image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",

    pronun: "/ˈæp.əl/",
  },
  {
    id: 2,
    id_set: 6,
    word: "book",
    meaning: "sách",

    image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",

    pronun: "/ˈæp.əl/",
  },
  {
    id: 1,
    id_set: 5,
    word: "apple",
    meaning: "quả táo",

    image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",

    pronun: "/ˈæp.əl/",
  },
  {
    id: 2,
    id_set: 5,
    word: "book",
    meaning: "sách",
    image: "https://example.com/book.jpg",
    pronun: "/bʊk/",
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
  {
    id: 1,
    id_set: 10,
    word: "Elephant",
    meaning: "Con voi",
    image: "https://cdn-icons-png.flaticon.com/512/616/616408.png", // Elephant
    pronun: "/ˈɛl.ɪ.fənt/",
  },
  {
    id: 2,
    id_set: 10,
    word: "Tiger",
    meaning: "Con hổ",
    image: "https://cdn-icons-png.flaticon.com/512/1998/1998610.png", // Tiger
    pronun: "/ˈtaɪ.ɡər/",
  },
  {
    id: 3,
    id_set: 10,
    word: "Monkey",
    meaning: "Con khỉ",
    image: "https://cdn-icons-png.flaticon.com/512/616/6164087.png", // Monkey
    pronun: "/ˈmʌŋ.ki/",
  },
  {
    id: 4,
    id_set: 10,
    word: "Lion",
    meaning: "Con sư tử",
    image: "https://cdn-icons-png.flaticon.com/512/616/616554.png", // Lion
    pronun: "/ˈlaɪ.ən/",
  },
  {
    id: 5,
    id_set: 10,
    word: "Giraffe",
    meaning: "Con hươu cao cổ",
    image: "https://cdn-icons-png.flaticon.com/512/584/584769.png", // Giraffe
    pronun: "/dʒɪˈræf/",
  },
  {
    id: 1,
    id_set: 11,
    word: "Batman",
    meaning: "Người Dơi",
    image: testimg.batman,
    pronun: "/dʒɪˈræf/",
  },
  {
    id: 2,
    id_set: 11,
    word: "Car",
    meaning: "Xe",
    image: testimg.car,
    pronun: "/dʒɪˈræf/",
  },
  {
    id: 3,
    id_set: 11,
    word: "Ronaldo",
    meaning: "Bỉ Đẩy",
    image: testimg.baydi,
    pronun: "/dʒɪˈræf/",
  },
  {
    id: 4,
    id_set: 11,
    word: "Real Madrid",
    meaning: "Best club itw",
    image: testimg.real,
    pronun: "/dʒɪˈræf/",
  },
];
