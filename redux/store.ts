import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import selectedCategoryReducer from './reducers/selectedCategoryReducer';
import packagesReducer from './reducers/packagesReducer';
import OrderReducerSlice from './reducers/OrdersReducer';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        selectedcategory: selectedCategoryReducer,
        packages: packagesReducer,
        orders: OrderReducerSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;