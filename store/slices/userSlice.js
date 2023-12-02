import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: 0,
    namesurname: "",
    email: "",
    password: "",
    friends: [],
    posts: [],
  },
  reducers: {
    updateUserID: (state, action) => {
      state.userID = action.payload;
    },
    updateNameSurname: (state, action) => {
      state.namesurname = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { updateUserID, updateEmail, updateNameSurname, updatePassword } =
  userSlice.actions;
