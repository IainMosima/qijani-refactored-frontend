import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import categoriesReducer from './reducers/categoriesReducer';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        categories: categoriesReducer
        
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;