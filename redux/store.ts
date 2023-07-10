import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import categoriesReducer from './reducers/categoriesReducer';
import selectedCategoryReducer from './reducers/selectedCategoryReducer';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        categories: categoriesReducer,
        selectedcategory: selectedCategoryReducer
        
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;