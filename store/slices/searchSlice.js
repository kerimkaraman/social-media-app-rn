import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
    isReadyToSearch: false,
  },
  reducers: {
    updateSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    updateSearchHandler: (state, action) => {
      state.isReadyToSearch = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { updateSearchText } = searchSlice.actions;
