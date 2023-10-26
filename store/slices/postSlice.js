import { createSlice } from "@reduxjs/toolkit";

const post = createSlice({
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
