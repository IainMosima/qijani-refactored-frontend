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

export async function getMyOrders(dispatch: Dispatch) {
    await getOrders().then(res => dispatch(setOrders(res))).catch(err => console.error('Something went wrong, please refresh the page'));
}

export const { setOrders } = OrderReducerSlice.actions;
export default OrderReducerSlice.reducer;