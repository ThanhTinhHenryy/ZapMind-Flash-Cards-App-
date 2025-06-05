const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://192.168.26.121:5000/api";

// Tạo flashcard mới
// export const createCard = async ({ deck_id, front_text, back_text, image }) => {
//   try {
//     const formData = new FormData();
//     formData.append("deck_id", deck_id);
//     formData.append("front_text", front_text);
//     formData.append("back_text", back_text);
//     if (image === null) {
//       // Nếu không có ảnh thật -> dùng ảnh giả
//       const fakeImagePath = path.resolve("data", "fake.jpg");
//       const fileStream = fs.createReadStream(fakeImagePath);

//       formData.append("image", fileStream, {
//         filename: "fake.jpg",
//         contentType: "image/jpeg",
//       });
//     } else {
//       formData.append("image", {
//         uri: image.uri,
//         name: image.name || "card.jpg",
//         type: image.type || "image/jpeg",
//       });
//     }

//     const res = await fetch(`${API_BASE_URL}/cards`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.message || "Tạo card thất bại");
//     }

//     return data;
//   } catch (err) {
//     console.error("Lỗi createCard:", err);
//     throw err;
//   }
// };
// Lấy tất cả card trong 1 deck
export const getAllCards = async (deckId) => {
  try {
    console.log(API_BASE_URL);

    const res = await fetch(`${API_BASE_URL}/cards/deck/${deckId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Không lấy được flashcards");
    }

    return data;
  } catch (err) {
    console.error("Lỗi getAllCards:", err);
    throw err;
  }
};

// Cập nhật card
// export const updateCard = async ({ id, front_text, back_text, image }) => {
//   try {
//     const formData = new FormData();
//     formData.append("front_text", front_text);
//     formData.append("back_text", back_text);

//     if (image === null) {
//       // Nếu không có ảnh thật -> dùng ảnh giả
//       const fakeImagePath = path.resolve("data", "fake.jpg");
//       const fileStream = fs.createReadStream(fakeImagePath);

//       formData.append("image", fileStream, {
//         filename: "fake.jpg",
//         contentType: "image/jpeg",
//       });
//     } else {
//       formData.append("image", {
//         uri: image.uri,
//         name: image.name || "card.jpg",
//         type: image.type || "image/jpeg",
//       });
//     }

//     const res = await fetch(`${API_BASE_URL}/cards/${id}`, {
//       method: "PUT",
//       body: formData,
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       throw new Error(data.message || "Cập nhật card thất bại");
//     }

//     return data;
//   } catch (err) {
//     console.error("Lỗi updateCard:", err);
//     throw err;
//   }
// };
// Xoá card
export const deleteCard = async (cardId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/cards/${cardId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Xoá flashcard thất bại");
    }

    return data;
  } catch (err) {
    console.error("Lỗi deleteCard:", err);
    throw err;
  }
};

export const createSet = async ({
  userId,
  setName,
  description,
  isPrivate,
  imageUri,
}) => {
  const formData = new FormData();

  formData.append("user_id", userId);
  formData.append("name", setName);
  formData.append("description", description);
  formData.append("is_public", isPrivate === true ? 1 : 0);

  if (imageUri) {
    const filename = imageUri.split("/").pop() || "photo.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const ext = match?.[1] || "jpg";
    const type = `image/${ext}`;

    formData.append("image", {
      uri: imageUri,
      name: filename,
      type,
    }); // 👈 React Native cần ép kiểu như này
  }

  try {
    const res = await fetch(`${API_BASE_URL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Tạo set thất bại");
    }

    return data;
  } catch (error) {
    console.error("Lỗi tạo set:", error);
    throw error;
  }
};
export const createCard = async (deck_id, front_text, back_text, image) => {
  try {
    const formData = new FormData();
    formData.append("deck_id", deck_id);
    formData.append("front_text", front_text);
    formData.append("back_text", back_text);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    }

    const response = await fetch(`${API_BASE_URL}/cards/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi tạo card");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi tạo card:", error.message);
    throw error;
  }
};
export const updateCard = async (id, front_text, back_text, image) => {
  try {
    console.log(id, front_text, back_text, image);

    const formData = new FormData();
    formData.append("front_text", front_text);
    formData.append("back_text", back_text);

    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    }

    const response = await fetch(`http://192.168.26.121:5000/api/cards/${id}`, {
      method: "PUT",

      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi cập nhật card");
    }

    return await response.json();
  } catch (err) {
    console.error("Update card error:", err);
    throw err;
  }
};
