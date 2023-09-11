"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Images } from "../../constants";
import { UnauthorizedError } from "../../errors/http_errors";
import { loginCredentials } from "../../models/loginCredentials";
import { getLoggedInUser, login } from "../../network/users";

import { useAppDispatch } from "@/hooks/reduxHook";
import { getOrders } from "@/network/order";
import { setOrders } from "@/redux/reducers/OrdersReducer";
import { userLogin } from "@/redux/reducers/loginReducer";
import { setMypackages } from "@/redux/reducers/packagesReducer";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { fetchPackages } from "../../network/package";
import "./forms.scss";

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
  const [showPassword, setShowPassword] = useState(false);
  const registerOptions = {
    usernameEmail: { required: "Name or UserName is required" },
    password: { required: "Password is required" },
  };

  
  async function onSubmit(credentials: loginCredentials) {
    try {
      const token = await login({...credentials, usernameEmail: credentials.usernameEmail.toLowerCase()});
      console.log(token);
      localStorage.setItem('token', token);
      const user = await getLoggedInUser(token);
      
      if (user) {
        dispatch(userLogin(user));
        const myPackages = await fetchPackages(token);
        const myOrders = await getOrders(token);
        if (myPackages) dispatch(setMypackages(myPackages));
        if (myOrders) dispatch(setOrders(myOrders));
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
          <Image priority={true} className="icon" src={Images.accountIcon} alt="profile-icon" />
          <input
            type="text"
            placeholder="Username or Email"
            className="lowercase"
            {...register("usernameEmail", registerOptions.usernameEmail)}
          />
        </div>

        {errors.password && <p className="text-danger">Password is required</p>}
        <div>
          <Image priority={true} className="icon" src={Images.passwordLockIcon} alt="profile-icon" />
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Password"
            {...register("password", registerOptions.password)}
            className="relative"
          />
          {showPassword ? <Image priority={true} src={Images.hideIcon} alt="visible-icon" className="absolute lg:left-[58%] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={()=>setShowPassword(false)}/> : <Image src={Images.visibleIcon} alt="visible-icon" className="absolute lg:left-[58%] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={()=>setShowPassword(true)}/>}
        </div>

        <button disabled={isSubmitting} className="bg-green text-yellow">
          {!isSubmitting && <p>Log In</p>}
          {isSubmitting && <CircularProgress color="inherit" size={30}/>}
        </button>
      </form>
    </div>
  );
};


export default LoginForm;
