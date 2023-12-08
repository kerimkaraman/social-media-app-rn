import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";
import commentModal from "./slices/commentModalSlice";
import likeModal from "./slices/likeModal";

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    commentModal: commentModal,
    likeModal: likeModal,
  },
});
