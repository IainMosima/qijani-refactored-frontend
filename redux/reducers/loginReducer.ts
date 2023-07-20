import { loginCredentials } from "@/models/loginCredentials";
import { User } from "@/models/user";
import { fetchPackages } from "@/network/package";
import { getLoggedInUser, getUserProfileImageSignedUrl, login } from "@/network/users";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { setMypackages } from "./packagesReducer";

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
      state.user = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
    },
  },
});

export const { userLogin, userLogout } = loginSlice.actions;
export default loginSlice.reducer;
