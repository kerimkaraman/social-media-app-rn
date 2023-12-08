import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";
import commentModal from "./slices/commentModalSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    commentModal: commentModal,
  },
});
