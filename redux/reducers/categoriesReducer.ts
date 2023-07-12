import { fetchCategories } from "@/network/products";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: ['ALl']
}

const categoriesReducerSlice = createSlice({
    name: 'categoriesReducer',
    initialState,
    reducers: {
        setAvailableCategories: (state, action: PayloadAction<string[]>) => {
            state.categories = ['All', ...action.payload];
        }
    }

})

export async function getAvailableCategories(dispatch: Dispatch) {
    const res = await fetchCategories();
    dispatch(setAvailableCategories(res));


}

export const { setAvailableCategories } = categoriesReducerSlice.actions;
export default categoriesReducerSlice.reducer;