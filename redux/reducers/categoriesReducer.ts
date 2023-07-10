import { fetchCategories } from "@/network/products";
import { Dispatch, createSlice } from "@reduxjs/toolkit";

export default function categoriesReducer(state = [], action: { type: string, payload: [] }) {
    if (action.type === 'fetch') {
        return action.payload;
    }
    return state
}
export async function getAvailableCategories(dispatch: Dispatch) {
    const res = await fetchCategories();
    dispatch({ type: 'fetch', payload: ['All', ...res] });


}