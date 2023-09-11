import { OrderStructure } from "@/models/order";
import { getOrders } from "@/network/order";
import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: OrderStructure[] = [];

const OrderReducerSlice = createSlice({
    name: 'orderReducerSlice',
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderStructure[]>) => {
            return [...action.payload]
        }
    }
});

export const getMyOrders = (token: string) => async (dispatch: Dispatch) => {
    try {
        const response = await getOrders(token);
        dispatch(setOrders(response));
    } catch (error) {
        console.error(error);
        alert('Something went wrong, please refresh the page');

    }
}

export const { setOrders } = OrderReducerSlice.actions;
export default OrderReducerSlice.reducer;