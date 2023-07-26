"use client";
import "./Profile.scss";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import Loading from '../Loading/Loading';
import isEmailValid from "../../utils/isEmailValid";
import Image from "next/image";
import { Images } from "@/constants";
import { useDisclosure } from '@mantine/hooks';
import { Input, Tooltip, Select, Button, Modal, PasswordInput } from '@mantine/core';
import { useAppSelector } from '@/hooks/reduxHook';
import { useAppDispatch } from "@/hooks/reduxHook";
import { updateProfile } from '@/network/users';
import CircularProgress from "@mui/material/CircularProgress";
import isPasswordOk from '@/utils/isPasswordOk';


const ViewUserProfile = () => {
    const user = useAppSelector(state => state.login.user);

    const [usernameClassname, setUsernameClassname] = useState("usernameInput");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [usernameClassname2, setUsernameClassname2] = useState("mini_intro");

    const [emailClassname, setEmailClassname] = useState("usernameInput");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailClassname2, setEmailClassname2] = useState("email");

    const [countyClassname, setCountyClassname] = useState("county");
    const [countyMessage, setCountyMessage] = useState("");

    const [areaClassname, setAreaClassname] = useState("area");
    const [areaMessage, setAreaMessage] = useState("");

    const [landmarkClassname, setLandmarkClassname] = useState("landmark");
    const [landmarkMessage, setLandmarkMessage] = useState("");

    const [phoneNumberClassName, setPhoneNumberClassName] = useState("usernameInput");
    const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
    const [phoneNumberClassName2, setPhoneNumberClassName2] = useState("phone");

    const [passwordClassname, setPasswordClassname] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [password, setPassword] = useState("");

    const [confirmPasswordClassName, setConfirmPasswordClassName] = useState("");
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

    const [username, setUsername] = useState(user?.username);
    const [location, setLocation] = useState(user?.location);
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
    const [email, setEmail] = useState(user?.email);
    // const [county, setCounty] = useState(user?.county);
    // const [area, setArea] = useState(user?.area);
    // const [landmark, setLandmark] = useState(user?.landmark);
    // const [selectedProfileImage, setSelectedProfileImage] = useState<
    //     File | undefined
    // >();

    const [opened, { open, close }] = useDisclosure(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm();

    const navigate = useRouter();

    const onSubmit: SubmitHandler<FieldValues> = async (
        credentials: FieldValues
    ) => {
        const formData = new FormData();
        formData.append("username", credentials.username);
        formData.append("email", credentials.email);
        formData.append("phoneNumber", credentials.phoneNumber);
        formData.append("location", credentials.location);
        // formData.append("prevPassword", credentials.prevPassword);
        // formData.append("newPassword", credentials.newPassword);
        // formData.append("profileImg", credentials.profileImg[0]);
        formData.append("county", credentials.county);
        formData.append("area", credentials.area);
        formData.append("landmark", credentials.landmark);

        console.log(formData);

        try {
            const client = await updateProfile(formData, user?._id!);

            if (client) {
                navigate.push("/profile");;
            }
        } catch (error) {
            console.error(error);
        }
    };

    function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const username = event.target.value;
        setUsername(username);

        setTimeout(() => {
            if (username.length < 5) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Username must be at least 5 characters!!");
            } else {
                setUsernameClassname("input-ok, mini_intro");
                setUsernameMessage("");
            }
        }, 1500);
    }

    function onLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
        const location = event.target.value;
        setLocation(location);

        setTimeout(() => {
            if (location.length < 3) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Location must be at least 3 characters!!");
            } else {
                setUsernameClassname("input-ok, mini_intro");
                setUsernameMessage("");
            }
        }, 1500);
    }

    function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setEmail(email);
        const validEmail = isEmailValid(email);

        setTimeout(() => {
            if (!validEmail) {
                setEmailClassname("input-warning, email");
                setEmailMessage("Enter a valid email address!!");
            } else {
                setEmailClassname("input-ok, email");
                setEmailMessage("");
            }
        }, 1500);
    }

    function onPhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        const phoneNumber = event.target.value;
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const intPhoneNumber = parseInt(phoneNumber);
        setPhoneNumber(intPhoneNumber);

        setTimeout(() => {
            // condtion checking for mobile numbers
            if (
                intPhoneNumber.toString().length !== 9 ||
                !numbers.includes(phoneNumber[phoneNumber.length - 1]) ||
                (phoneNumber[0] !== "7" && phoneNumber[0] !== "1")
            ) {
                setPhoneNumberClassName("input-warning, phone");
                setPhoneNumberMessage("Enter a valid phone number!!");
            } else {
                setPhoneNumberClassName("input-ok, phone");
                setPhoneNumberMessage("");
            }
        }, 2000);
    }

    function onCountyChange(event: React.ChangeEvent<HTMLInputElement>) {
        const county = event.target.value;

        setTimeout(() => {
            if (county.length < 3) {
                setCountyClassname("input-warning, county");
                setCountyMessage("County must be chosen!!");
            } else {
                setCountyClassname("input-ok, county");
                setCountyMessage("");
            }
        }, 1500);
    }

    function onAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
        const area = event.target.value;

        setTimeout(() => {
            if (area.length < 3) {
                setAreaClassname("input-warning, area");
                setAreaMessage("Area must be at least 3 characters!!");
            } else {
                setAreaClassname("input-ok, area");
                setAreaMessage("");
            }
        }, 1500);
    }

    function onLandmarkChange(event: React.ChangeEvent<HTMLInputElement>) {
        const landmark = event.target.value;

        setTimeout(() => {
            if (landmark.length < 3) {
                setLandmarkClassname("input-warning, landmark");
                setLandmarkMessage("Landmark must be at least 3 characters!!");
            } else {
                setLandmarkClassname("input-ok, landmark");
                setLandmarkMessage("");
            }
        }, 1500);
    }

    function onPrevPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const prevPassword = event.target.value;

        setTimeout(() => {
            const message = isPasswordOk(prevPassword);
            if (typeof message === "string") {
                setPasswordClassname("input-warning");
                setPasswordMessage(message);
            } else {
                setPasswordClassname("input-ok");
                setPasswordMessage("");
                setPassword(prevPassword);
            }
        }, 1700);
    }

    function onNewPasswordChange(event: any) {
        const newPassword = event.target.value;

        setTimeout(() => {
            if (newPassword !== password) {
                setConfirmPasswordClassName("input-warning");
                setConfirmPasswordMessage("Passwords do not match");
            } else {
                setConfirmPasswordClassName("input-ok");
                setConfirmPasswordMessage("");
            }
        }, 1000);
    }

    // function profileImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    //     let file;
    //     if (event.target.files && event.target.files[0]) {
    //         file = event.target.files[0];
    //     }
    //     if (file) {
    //         setSelectedProfileImage(file);
    //     }
    // }

    return (
        <div className="app__profile sm:mt-[8.5rem] mt-[7.5rem]">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="profile_intro">
                    <div className="mini_intro">
                        {user?.profileImgKey && (
                            <Image
                                className="intro_image"
                                width={40}
                                height={40}
                                src={`${process.env.NEXT_PUBLIC_USERSBUCKET}/${user.profileImgKey}`}
                                alt="profile_image" />
                        )}
                        {!user?.profileImgKey && (
                            <Image className="intro_image"
                                src={Images.profile}
                                alt="default" />
                        )}
                        <Image className="edit1" src={Images.edit} alt="edit-icon" />
                    </div>

                    <div className={usernameClassname2}>
                        <div className="mini_details">
                            <p><b>{user?.username}</b></p>
                            <small>{user?.location}</small>
                        </div>
                        <button onClick={() => { setUsernameClassname2("usernameInput"); setUsernameClassname("mini_intro") }}>
                            <Image className="edit1" src={Images.edit} alt="edit-icon" />
                        </button>
                    </div>

                    <div className={usernameClassname}>
                        <div className="mini_details">
                            <div>{usernameMessage && <small className="text-danger">{usernameMessage}</small>}</div>
                            <div className="mini_details2">
                                <Image className="icon2" src={Images.accountIcon} alt="profile-icon" />
                                <div className="mini_details3">
                                    <label className="label">Username:</label>
                                    <input
                                        className="input"
                                        value={username}
                                        type="text"

                                        required
                                        {...register("username", { onChange: onUsernameChange })}
                                    />
                                </div>
                            </div>
                            <div className="mini_details2">
                                <Image className="icon2" src={Images.locationIcon} alt="profile-icon" />
                                <div className="mini_details3">
                                    <label className="label">Location:</label>
                                    <input
                                        className="input"
                                        value={location}
                                        type="text"
                                        placeholder="Location"
                                        required
                                        {...register("location", { onChange: onLocationChange })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_details">
                    <div className={phoneNumberClassName2}>
                        <Image className='phone_icon' src={Images.phoneIcon} alt="phone-icon" />
                        <div className="phone_mini">
                            <h3><b>PHONE</b></h3>
                            <div className="number">
                                <p>{user?.phoneNumber}</p>
                                <button onClick={() => { setPhoneNumberClassName2("usernameInput"); setPhoneNumberClassName("phone") }}>
                                    <Image className="edit1" src={Images.edit} alt="edit-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={phoneNumberClassName}>

                        <Image className='phone_icon' src={Images.phoneIcon} alt="profile-icon" />

                        <div className="phone_mini">
                            {phoneNumberMessage && (
                                <small className="text-danger">{phoneNumberMessage}</small>
                            )}
                            <label className="label">Phone Number:</label>
                            <input
                                id="number"
                                className="input"
                                value={phoneNumber}
                                type="number"
                                placeholder="Phonenumber"
                                required
                                {...register("phoneNumber", { onChange: onPhoneNumberChange })}
                            />
                        </div>

                    </div>
                    <div className={emailClassname2}>
                        <Image className='email_icon' src={Images.emailIcon} alt="phone-icon" />
                        <div className="email_mini">
                            <h3><b>EMAIL</b></h3>
                            <div className="mail">
                                <p>{user?.email}</p>
                                <button onClick={() => { setEmailClassname2("usernameInput"); setEmailClassname("email") }}>
                                    <Image className="edit1" src={Images.edit} alt="edit-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={emailClassname} >
                        <Image className='email_icon' src={Images.emailIcon} alt="profile-icon" />
                        <div className="email_mini">
                            {emailMessage && <small className="text-danger">{emailMessage}</small>}
                            <label className="label">Email:</label>
                            <input
                                className="input"
                                type="string"
                                value={email}
                                placeholder="Email"
                                required
                                {...register("email", { onChange: onEmailChange })}
                            />
                        </div>

                    </div>
                </div>
                <div className="delivery_details">
                    <h5><b>Delivery Info.</b></h5>
                    <div className={countyClassname}>
                        <div>
                            <h5>County:</h5>
                        </div>
                        <div>
                            {countyMessage && <small className="text-danger">{countyMessage}</small>}
                            <select className="input select" {...register("county", { onChange: onCountyChange })} required>
                                <option>----</option>
                                <option value="baringo">Baringo</option>
                                <option value="bomet">Bomet</option>
                                <option value="bungoma">Bungoma</option>
                                <option value="busia">Busia</option>
                                <option value="elgeyo marakwet">Elgeyo Marakwet</option>
                                <option value="embu">Embu</option>
                                <option value="garissa">Garissa</option>
                                <option value="homa bay">Homa Bay</option>
                                <option value="isiolo">Isiolo</option>
                                <option value="kajiado">Kajiado</option>
                                <option value="kakamega">Kakamega</option>
                                <option value="kericho">Kericho</option>
                                <option value="kiambu">Kiambu</option>
                                <option value="kilifi">Kilifi</option>
                                <option value="kirinyaga">Kirinyaga</option>
                                <option value="kisii">Kisii</option>
                                <option value="kisumu">Kisumu</option>
                                <option value="kitui">Kitui</option>
                                <option value="kwale">Kwale</option>
                                <option value="laikipia">Laikipia</option>
                                <option value="lamu">Lamu</option>
                                <option value="machakos">Machakos</option>
                                <option value="makueni">Makueni</option>
                                <option value="mandera">Mandera</option>
                                <option value="meru">Meru</option>
                                <option value="migori">Migori</option>
                                <option value="marsabit">Marsabit</option>
                                <option value="mombasa">Mombasa</option>
                                <option value="muranga">Muranga</option>
                                <option value="nairobi">Nairobi</option>
                                <option value="nakuru">Nakuru</option>
                                <option value="nandi">Nandi</option>
                                <option value="narok">Narok</option>
                                <option value="nyamira">Nyamira</option>
                                <option value="nyandarua">Nyandarua</option>
                                <option value="nyeri">Nyeri</option>
                                <option value="samburu">Samburu</option>
                                <option value="siaya">Siaya</option>
                                <option value="taita taveta">Taita Taveta</option>
                                <option value="tana river">Tana River</option>
                                <option value="tharaka nithi">Tharaka Nithi</option>
                                <option value="trans nzoia">Trans Nzoia</option>
                                <option value="turkana">Turkana</option>
                                <option value="uasin gishu">Uasin Gishu</option>
                                <option value="vihiga">Vihiga</option>
                                <option value="wajir">Wajir</option>
                                <option value="pokot">West Pokot</option>
                            </select>
                        </div>
                    </div>
                    <div className={areaClassname}>
                        <div>
                            <h5>Area:</h5>
                        </div>
                        <div>
                            {areaMessage && <small className="text-danger">{areaMessage}</small>}
                            <Input
                                required
                                {...register("area", { onChange: onAreaChange })}
                                placeholder="E.g. Juja, Thika, Kilimani"
                                rightSection={
                                    <Tooltip label="Enter the town you're in!" position="top-end" withArrow>
                                        <div>
                                            <Image className="info" src={Images.info} alt="info-icon" />
                                        </div>
                                    </Tooltip>
                                }
                            />
                        </div>
                    </div>
                    <div className={landmarkClassname}>
                        <div>
                            <h5>Landmark:</h5>
                        </div>
                        <div>
                            {landmarkMessage && <small className="text-danger">{landmarkMessage}</small>}
                            <Input
                                required
                                {...register("landmark", { onChange: onLandmarkChange })}
                                placeholder="E.g. Building name"
                                rightSection={
                                    <Tooltip label="Enter a well known building near you!" position="top-end" withArrow>
                                        <div>
                                            <Image className="info" src={Images.info} alt="info-icon" />
                                        </div>
                                    </Tooltip>
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="bottom_details">
                    <a onClick={open}>
                        <p className="change">Change password?</p>
                    </a>
                    <Button type='submit' className="save" variant="white" color="gray">
                        {!isSubmitting && <p>Save Changes</p>}
                        {isSubmitting && <CircularProgress color="inherit" />}
                    </Button>

                </div>
            </form>
            <Modal className="modal" opened={opened} onClose={close} title="Password Reset" centered>
                <div className="">
                    <div>
                        {passwordMessage && <small className="text-danger">{passwordMessage}</small>}
                        <PasswordInput
                            label="Old Password"
                            description="Password must include at least one letter, number and special character!!"
                            withAsterisk
                            required
                            {...register("prevPassword", { onChange: onPrevPasswordChange })}
                            placeholder="Enter your previous password..."
                        />
                    </div>
                </div>
                <div className="confirm">
                    <div>
                        {confirmPasswordMessage && <small className="text-danger">{confirmPasswordMessage}</small>}
                        <PasswordInput
                            label="New Password"
                            description="Password must include at least one letter, number and special character!!"
                            withAsterisk
                            required
                            {...register("newPassword", { onChange: onNewPasswordChange })}
                            placeholder="Enter your new password..."
                        />
                    </div>
                </div>
                <div className="submit">
                    <Button type='submit'>Submit</Button>
                </div>
            </Modal>
            {/* <div className="mt-[23rem]">
                <Loading />
            </div> */}
        </div>
    );
}

export default ViewUserProfile;