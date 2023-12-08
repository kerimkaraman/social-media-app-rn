import { createSlice } from "@reduxjs/toolkit";

export const commentModal = createSlice({
  name: "commentModal",
  initialState: {
    isOpened: false,
    commentText: "",
    postId: "",
  },
  reducers: {
    updateCommentModalState: (state) => {
      state.isOpened = !state.isOpened;
    },
    updateCommentText: (state, action) => {
      state.commentText = action.payload;
    },
    updateCommentPostId: (state, action) => {
      state.postId = action.payload;
    },
  },
});

export default commentModal.reducer;
export const {
  updateCommentModalState,
  updateCommentText,
  updateCommentPostId,
} = commentModal.actions;
