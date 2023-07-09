import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.name;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
