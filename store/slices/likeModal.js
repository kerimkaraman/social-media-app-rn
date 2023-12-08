import { createSlice } from "@reduxjs/toolkit";

export const likeModal = createSlice({
  name: "likeModal",
  initialState: {
    isOpened: false,
  },
  reducers: {
    updateLikeModalState: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
});

export default likeModal.reducer;
export const { updateLikeModalState } = likeModal.actions;
