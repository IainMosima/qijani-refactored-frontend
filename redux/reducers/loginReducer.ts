import { User } from "@/models/user";
import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  user: User | null,
}

const initialState: LoginState = {
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = loginSlice.actions;
export default loginSlice.reducer;
