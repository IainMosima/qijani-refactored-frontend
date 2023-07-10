import { fetchCategories } from "@/network/products";
import { Dispatch } from "@reduxjs/toolkit";

export default function categoriesReducer(state = ['All'], action: { type: string, payload: [] }) {
    switch (action.type) {
        case 'fetch':
            return action.payload;
        default:
            return state
    }
}
export async function getAvailableCategories(dispatch: Dispatch) {
    const res = await fetchCategories();
    dispatch({ type: 'fetch', payload: ['All', ...res] });


}