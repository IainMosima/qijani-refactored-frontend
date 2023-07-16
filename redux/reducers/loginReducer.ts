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

export async function checkLoggedInUser(dispatch: Dispatch) {
  const user = await getLoggedInUser();
  if (user) {
    if (user.profileImgKey) {
      const signedUrl = await getUserProfileImageSignedUrl(user.profileImgKey);
      dispatch(userLogin({ ...user, profileImgKey: signedUrl.url }));
    } else {
      dispatch(userLogin(user));
    }
  }
}
