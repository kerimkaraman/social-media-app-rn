import { createSlice } from "@reduxjs/toolkit";

export const post = createSlice({
  name: "post",
  initialState: {
    text: "",
    img: "",
    postID: 0,
    likes: {
      user: {
        id: 0,
        name: "",
        photo: "",
      },
    },
  },
});
