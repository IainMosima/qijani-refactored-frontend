"use client";
import { Images } from "../../constants";
import React from "react";
import { loginCredentials } from "../../models/loginCredentials";
import { useForm } from "react-hook-form";
import { UnauthorizedError } from "../../errors/http_errors";
import { getUserProfileImageSignedUrl, login } from "../../network/users";

import "./forms.scss";
import { User } from "../../models/user";
import CircularProgress from "@mui/material/CircularProgress";
import { PackageStructure } from "../../models/package";
import { fetchPackages } from "../../network/package";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { userLogin } from "@/redux/reducers/loginReducer";
import { setMypackages } from "@/redux/reducers/packagesReducer";

interface LoginProps {
  setErrorText: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm = ({ setErrorText }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginCredentials>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.user);
  const registerOptions = {
    usernameEmail: { required: "Name or UserName is required" },
    password: { required: "Password is required" },
  };

  async function onSubmit(credentials: loginCredentials) {
    try {
      const user = await login(credentials);

      if (user) {
        dispatch(userLogin(user));
        const myPackages = await fetchPackages();
        if (myPackages) dispatch(setMypackages(myPackages));
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setErrorText("Invalid credentials, try again");
      } else {
        alert(err);
        console.error(err);
      }
    }
  }

  return (
    <div className="app__loginSignUp">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.usernameEmail && (
          <p className="text-danger">Email or Username is required</p>
        )}
        <div>
          <Image className="icon" src={Images.accountIcon} alt="profile-icon" />
          <input
            type="text"
            placeholder="Username or Email"
            {...register("usernameEmail", registerOptions.usernameEmail)}
          />
        </div>

        {errors.password && <p className="text-danger">Password is required</p>}
        <div>
          <Image className="icon" src={Images.passwordLockIcon} alt="profile-icon" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", registerOptions.password)}
          />
        </div>

        <button disabled={isSubmitting}>
          {!isSubmitting && <p>Log In</p>}
          {isSubmitting && <CircularProgress color="inherit" />}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
