import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: 'All'
};

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload.selectedCategory;
    }
  },
});

export const { selectCategory } = selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;