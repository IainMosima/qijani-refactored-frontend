import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './reducers/loginReducer';
import selectedCategoryReducer from './reducers/selectedCategoryReducer';
import packagesReducer from './reducers/packagesReducer';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        selectedcategory: selectedCategoryReducer,
        packages: packagesReducer
        
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;