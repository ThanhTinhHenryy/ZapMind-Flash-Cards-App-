// userStore.ts
let currentUser = {
  name: "",
  email: "",
  id: 0,
};

export function setUser(user: any) {
  currentUser.name = user.email;
  currentUser.id = user.id;
  currentUser.email = user.email;
}

export function getUser() {
  return currentUser;
}
