import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: 'All'
};

const selectedCategorySlice = createSlice({
  name: 'selectedCategory',
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    }
  },
});

export const { selectCategory } = selectedCategorySlice.actions;
export default selectedCategorySlice.reducer;