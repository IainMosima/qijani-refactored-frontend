"use client"
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Images } from "../../constants";
import { checkEmail, checkUsername, getLoggedInUser, getUserProfileImageSignedUrl, signUp } from "../../network/users";
import isEmailValid from "../../utils/isEmailValid";
import isPasswordOk from "../../utils/isPasswordOk";
import "./forms.scss";

import { useAppDispatch } from "@/hooks/reduxHook";
import { userLogin } from "@/redux/reducers/loginReducer";
import Image from "next/image";
import { useDebounce } from "use-debounce";

const SignUpForm = () => {
  const dispatch = useAppDispatch();


  const [usernameClassname, setUsernameClassname] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [username, setUsername] = useState('');
  const [debouncedUsername] = useDebounce(username, 300);
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailClassname, setEmailClassname] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [email, setEmail] = useState('');
  const [debouncedEmail] = useDebounce(email, 300);
  const [emailExists, setEmailExists] = useState(false);
  console.log(debouncedEmail);


  const [phoneNumberClassName, setPhoneNumberClassName] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  const [passwordClassname, setPasswordClassname] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPasswordClassName, setConfirmPasswordClassName] = useState("");
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const [error, setError] = useState(true);

  const [selectedProfileImage, setSelectedProfileImage] = useState<
    File | undefined
  >();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (
    credentials: FieldValues
  ) => {
    const formData = new FormData();
    formData.append("username", credentials.username.toLowerCase());
    formData.append("email", credentials.email);
    formData.append("phoneNumber", credentials.phoneNumber);
    formData.append("location", credentials.location);
    formData.append("password", credentials.password);
    // formData.append("profileImg", credentials.profileImg[0]);

    try {
      const token = await signUp(formData);
      localStorage.setItem('token', token);
      const user = await getLoggedInUser(token);
      if (user) {
        if (user.profileImgKey) {
          const signedUrl = await getUserProfileImageSignedUrl(
            user.profileImgKey
          );
          dispatch(
            userLogin({
              ...user,
              profileImageKey: signedUrl.url,
            })
          );
        } else {
          dispatch(userLogin(user));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const username = event.target.value.toLocaleLowerCase();
    setUsername(username);

    setTimeout(() => {
      if (usernameExists)
        if (username.length < 5) {
          setUsernameClassname("input-warning");
          setUsernameMessage("Username must be at least 5 characters");
          setError(true);
        } else if (username.split(' ').length > 1) {
          setUsernameClassname("input-warning");
          setUsernameMessage("Username must be only one word");
          setError(true);
        } else {
          setUsernameClassname("input-ok");
          setUsernameMessage("");
          setError(false);
        }
    }, 1500);
  }

  function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const email = event.target.value.toLocaleLowerCase();
    setEmail(email);
    const validEmail = isEmailValid(email);

    setTimeout(() => {
      if(emailExists)
      if (!validEmail) {
          setEmailClassname("input-warning");
          setEmailMessage("Enter a valid email address");
          setError(true);
        } else {
          setEmailClassname("input-ok");
          setEmailMessage("");
          setError(false);
        }
    }, 1500);
  }

  function onPhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    const phoneNumber = event.target.value;
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const intPhoneNumber = parseInt(phoneNumber);

    setTimeout(() => {
      // condtion checking for mobile numbers
      if (
        intPhoneNumber.toString().length !== 9 ||
        !numbers.includes(phoneNumber[phoneNumber.length - 1]) ||
        (phoneNumber[0] !== "7" && phoneNumber[0] !== "1")
      ) {
        setPhoneNumberClassName("input-warning");
        setPhoneNumberMessage("Enter a valid phone number");
        setError(true);
      } else {
        setPhoneNumberClassName("input-ok");
        setPhoneNumberMessage("");
        setError(false);
      }
    }, 2000);
  }

  function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.target.value;

    setTimeout(() => {
      const message = isPasswordOk(password);
      if (typeof message === "string") {
        setPasswordClassname("input-warning");
        setPasswordMessage(message);
        setError(true);
      } else {
        setPasswordClassname("input-ok");
        setPasswordMessage("");
        setPassword(password);
        setError(false);
      }
    }, 1700);
  }

  function confirmPasswordChange(event: any) {
    const confirmPassword = event.target.value;

    setTimeout(() => {
      if (confirmPassword !== password) {
        setConfirmPasswordClassName("input-warning");
        setConfirmPasswordMessage("Passwords do not match");
        setError(true);
      } else {
        setConfirmPasswordClassName("input-ok");
        setConfirmPasswordMessage("");
        setError(false);
      }
    }, 1000);
  }

  // function profileImageChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   let file;
  //   if (event.target.files && event.target.files[0]) {
  //     file = event.target.files[0];
  //   }
  //   if (file) {
  //     setSelectedProfileImage(file);
  //   }
  // }


  useEffect(() => {
    async function checkUsernameExists(username: string) {
      try {
        const response = await checkUsername(username);
        setUsernameExists(response);
        if (response) {
          setUsernameClassname("input-warning");
          setUsernameMessage("Username is already in use");
          setError(true);
        } else {
          setUsernameClassname("input-ok");
          setUsernameMessage("");
          setError(false);
        }
      } catch (error) {
        alert('Something went wrong, please referesh the page.');
      }


    }
    async function checkEmailExists(email: string) {
      try {
        const response = await checkEmail(email);
        setEmailExists(response);
        if (response) {
          setEmailClassname("input-warning");
          setEmailMessage("Email already exists");
          setError(true);
        } else {
          setEmailClassname("input-ok");
          setEmailMessage("");
          setError(false);
        }
      } catch (error) {
        alert('Something went wrong, please referesh the page.');
      }


    }

    if (debouncedUsername) checkUsernameExists(debouncedUsername);
    if (debouncedEmail) checkEmailExists(debouncedEmail);

  }, [debouncedUsername, debouncedEmail]);


  return (
    <div className="app__loginSignUp">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        {/* {usernameExists ? <p className="text-danger">{usernameMessage}</p>}  */}
        {usernameMessage && <p className="text-danger">{usernameMessage}</p>}
        <div className={usernameClassname}>
          <Image priority={true} className="icon" src={Images.accountIcon} alt="profile-icon" />
          <input
            type="text"
            placeholder="Username"
            required
            className="lowercase"
            {...register("username", { onChange: onUsernameChange })}
          />
        </div>

        {emailMessage && <p className="text-danger">{emailMessage}</p>}
        <div className={emailClassname}>
          <Image priority={true} className="icon" src={Images.emailIcon} alt="profile-icon" />
          <input
            type="email"
            placeholder="Email"
            required
            {...register("email", { onChange: onEmailChange })}
          />
        </div>

        {phoneNumberMessage && (
          <p className="text-danger">{phoneNumberMessage}</p>
        )}
        <div className={phoneNumberClassName}>
          <Image priority={true} className="icon" src={Images.phoneIcon} alt="profile-icon" />
          <p className="mobile-number px-2">+254</p>
          <input
            type="number"
            placeholder="Mpesa Number"
            {...register("phoneNumber", { onChange: onPhoneNumberChange })}
          />
        </div>


        <div className={passwordClassname}>
          <Image priority={true} className="icon" src={Images.passwordLockIcon} alt="profile-icon" />
          <input
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder="Password"
            {...register("password", { onChange: onPasswordChange })}
          />
          {showPassword ? <Image priority={true} src={Images.hideIcon} alt="visible-icon" className="absolute lg:left-[57.5rem] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={() => setShowPassword(false)} /> : <Image priority={true} src={Images.visibleIcon} alt="visible-icon" className="absolute lg:left-[57.5rem] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={() => setShowPassword(true)} />}
        </div>
        {passwordMessage && (
          <>
            <ul className="list-disc text-danger list-inside">
              {passwordMessage.split(",").map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <br />
          </>
        )}


        <div className={confirmPasswordClassName}>
          <Image priority={true} className="icon" src={Images.passwordLockIcon} alt="profile-icon" />
          <input
            type={`${showConfirmPassword ? 'text' : 'password'}`}
            placeholder="Confirm Password"
            onChange={confirmPasswordChange}
          />
          {showConfirmPassword ? <Image priority={true} src={Images.hideIcon} alt="visible-icon" className="absolute lg:left-[58%] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={() => setshowConfirmPassword(false)} /> : <Image priority={true} src={Images.visibleIcon} alt="visible-icon" className="absolute lg:left-[58%] md:left-[33.5rem] left-[18.7rem] cursor-pointer" width={27} onClick={() => setshowConfirmPassword(true)} />}
        </div>

        {confirmPasswordMessage && (
          <>
            <p className="text-danger">{confirmPasswordMessage}</p>
            <br />
          </>
        )}

        {/* <div className="input">
          <p>Profile picture</p>
          <input
            type="file"
            placeholder="profile"
            {...register("profileImg", { onChange: profileImageChange })}
          />
        </div> */}
        {selectedProfileImage && (
          <div>
            <p>Profile Image:</p>
            <Image priority={true}
              src={URL.createObjectURL(selectedProfileImage)}
              alt="Preview"
            />
          </div>
        )}

        <button className={`text-yellow ${error ? 'bg-gray' : 'bg-green'}`} disabled={error}>
          {!isSubmitting ? <p>Sign Up</p> : <CircularProgress color="inherit" size={30} />}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
