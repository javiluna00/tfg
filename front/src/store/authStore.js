import { atom } from "recoil";

const storedToken = localStorage.getItem("token");
const storedUser = JSON.parse(localStorage.getItem("user"));

export const authState = atom({
  key: "auth",
  default: {
    token: storedToken != null ? storedToken : null,
    user: storedUser !== null ? storedUser : null,
  },
});

