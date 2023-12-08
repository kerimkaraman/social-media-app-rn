import { createSlice } from "@reduxjs/toolkit";

export const commentModal = createSlice({
  name: "commentModal",
  initialState: {
    isOpened: false,
    commentText: "",
  },
  reducers: {
    updateCommentModalState: (state) => {
      state.isOpened = !state.isOpened;
    },
    updateCommentText: (state, action) => {
      state.commentText = action.payload;
    },
  },
});

export default commentModal.reducer;
export const { updateCommentModalState, updateCommentText } =
  commentModal.actions;
