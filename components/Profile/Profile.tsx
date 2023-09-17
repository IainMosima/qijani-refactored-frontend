"use client";
import { Images } from "@/constants";
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { checkEmail, checkUsername, updateProfile, } from '@/network/users';
import { userLogin } from "@/redux/reducers/loginReducer";
import isPasswordOk from '@/utils/isPasswordOk';
import { Button, Group, Input, Modal, PasswordInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Alert, AlertColor, Avatar, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import isEmailValid from "../../utils/isEmailValid";
import stringAvatar from "../../utils/stringToColor";
import { store } from "@/redux/store";

import "./Profile.scss";
import { getMyPackages } from "@/redux/reducers/packagesReducer";
import { getMyOrders } from "@/redux/reducers/OrdersReducer";


const ViewUserProfile = () => {
    const user = useAppSelector((state) => state.login.user)!;
    const dispatch = useAppDispatch();

    const [profileImgClassname, setProfileImgClassname] = useState("usernameInput");
    const [profileImgClassname2, setProfileImgClassname2] = useState("mini_intro");

    const [usernameClassname, setUsernameClassname] = useState("usernameInput");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [usernameClassname2, setUsernameClassname2] = useState("mini_intro");
    const [usernameExists, setUsernameExists] = useState(false);

    const [emailClassname, setEmailClassname] = useState("usernameInput");
    const [emailMessage, setEmailMessage] = useState("");
    const [emailClassname2, setEmailClassname2] = useState("email");
    const [emailExists, setEmailExists] = useState(false);

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

    const [displayMessage, setDisplayMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [isEditing2, setIsEditing2] = useState(false);



    const [opened, { open, close }] = useDisclosure(false);

    const [severity, setSeverity] = useState<AlertColor | undefined>();


    const [formData, setFormData] = useState({
        username: user?.username,
        location: user?.location,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        county: user?.county,
        area: user?.area,
        landmark: user?.landmark,
        profileImgKey: user?.profileImgKey,
    });

    const [formData2, setFormData2] = useState({
        prevPassword: '',
        newPassword: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitting2, setIsSubmitting2] = useState(false);

    const [openAlertModal, setOpenAlertModal] = useState(false);
    const navigate = useRouter();

    function onClose() {
        setOpenAlertModal(false);
    }

    const handleUsernameChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            username: event.target.value.toLowerCase(),
        }));
        const username = event.target.value.toLowerCase();

        setTimeout(() => {
            if (username.length < 5) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Username must be at least 5 characters");
                setIsEditing(false);
            } else if (username.split(' ').length > 1) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Username must be only one word");
                setIsEditing(false);
            }
            else {
                checkUsernameExists(username);
            }
        }, 1500);

        async function checkUsernameExists(username: string) {
            try {
                const response = await checkUsername(username);
                setUsernameExists(response);
                if (response) {
                    setUsernameClassname("input-warning, mini_intro");
                    setUsernameMessage("Username is already in use");
                    setIsEditing(false);
                } else {
                    setUsernameClassname("input-ok, mini_intro");
                    setUsernameMessage("");
                    setIsEditing(true);
                }
            } catch (error) {
                alert('Something went wrong, please referesh the page.');
            }


        }
    };

    const handleLocationChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            location: event.target.value,
        }));
        const location = event.target.value;

        setTimeout(() => {
            if (location.length < 3) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Location must be at least 3 characters!!");
                setIsEditing(false);
            } else {
                setUsernameClassname("input-ok, mini_intro");
                setUsernameMessage("");
                setIsEditing(true);
            }
        }, 1500);
    };

    const handleEmailChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            email: event.target.value.toLowerCase(),
        }));
        const email = event.target.value.toLowerCase();
        const validEmail = isEmailValid(email);

        setTimeout(() => {
            if (!validEmail) {
                setEmailClassname("input-warning, email");
                setEmailMessage("Enter a valid email address!!");
                setIsEditing(false);
            } else {
                checkEmailExists(email);
            }
        }, 1500);

        async function checkEmailExists(email: string) {
            try {
                const response = await checkEmail(email);
                setEmailExists(response);
                if (response) {
                    setEmailClassname("input-warning, email");
                    setEmailMessage("Email already exists");
                    setIsEditing(false);
                } else {
                    setEmailClassname("input-ok, email");
                    setEmailMessage("");
                    setIsEditing(true);
                }
            } catch (error) {
                alert('Something went wrong, please referesh the page.');
            }


        }
    };

    const handlePhoneNumberChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            phoneNumber: event.target.value,
        }));
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
                setPhoneNumberClassName("input-warning, phone");
                setPhoneNumberMessage("Enter a valid phone number!!");
                setIsEditing(false);
            } else {
                setPhoneNumberClassName("input-ok, phone");
                setPhoneNumberMessage("");
                setIsEditing(true);
            }
        }, 2000);
    };

    const handleCountyChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            county: event.target.value,
        }));
        const county = event.target.value;

        setTimeout(() => {
            if (county.length < 3) {
                setCountyClassname("input-warning, county");
                setCountyMessage("County must be chosen!!");
                setIsEditing(false);
            } else {
                setCountyClassname("input-ok, county");
                setCountyMessage("");
                setIsEditing(true);
            }
        }, 1500);
    };

    const handleAreaChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            area: event.target.value,
        }));
        const area = event.target.value;

        setTimeout(() => {
            if (area.length < 3) {
                setAreaClassname("input-warning, area");
                setAreaMessage("Area must be at least 3 characters!!");
                setIsEditing(false);
            } else {
                setAreaClassname("input-ok, area");
                setAreaMessage("");
                setIsEditing(true);
            }
        }, 1500);
    };

    const handleLandMarkChange = (event: { target: { value: any; }; }) => {
        setIsEditing(true);
        setFormData((prevData) => ({
            ...prevData,
            landmark: event.target.value,
        }));
        const landmark = event.target.value;

        setTimeout(() => {
            if (landmark.length < 3) {
                setLandmarkClassname("input-warning, landmark");
                setLandmarkMessage("Landmark must be at least 3 characters!!");
                setIsEditing(false);
            } else {
                setLandmarkClassname("input-ok, landmark");
                setLandmarkMessage("");
                setIsEditing(true);
            }
        }, 1500);
    };

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsSubmitting(true);
        dispatch(userLogin({ ...user, email: formData.email, username: formData.username, phoneNumber: formData.phoneNumber, county: formData.county, area: formData.area, landmark: formData.landmark }));
        try {
            const client = await updateProfile(formData, user?._id!);
            
            localStorage.setItem('token', client.updatedToken);

            if (client) {
                setDisplayMessage("Profile updated successfully!!");
                setShowMessage(true);
                setSeverity('success');
                setIsSubmitting(false);
                setOpenAlertModal(true);

            }
        } catch (error) {
            setDisplayMessage("Something went wrong, please try again");
            setShowMessage2(true);
            setSeverity('error');
            setIsSubmitting(false);
            setOpenAlertModal(true);
        }
    };

    const handleForm2Submit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setIsSubmitting2(true);
        try {
            const response = await updateProfile(formData2, user?._id!);

            if (response) {
                close();
                setDisplayMessage("Password updated successfully!!");
                setShowMessage(true);
                setSeverity('success');
                setIsSubmitting2(false);
                setOpenAlertModal(true);
            }
        } catch (error) {
            close();
            setDisplayMessage("Invalid password!!");
            setShowMessage2(true);
            setSeverity('error');
            setIsSubmitting2(false);
            setOpenAlertModal(true);

        }
    };


    const handlePrevPasswordChange = (event: { target: { value: any; }; }) => {
        setFormData2((prevData) => ({
            ...prevData,
            prevPassword: event.target.value,
        }));

        const prevPassword = event.target.value;

        setTimeout(() => {
            if (prevPassword === '') {
                setPasswordClassname("input-warning");
                setPasswordMessage("Password cannot be empty!!");
                setIsEditing2(false);
            } else {
                setPasswordClassname("input-ok");
                setPasswordMessage("");
                setIsEditing2(true);
            }
        }, 1000);
    };

    const handleNewPasswordChange = (event: { target: { value: any; }; }) => {
        setIsEditing2(true);
        setFormData2((prevData) => ({
            ...prevData,
            newPassword: event.target.value,
        }));
        const newPassword = event.target.value;

        setTimeout(() => {
            const message = isPasswordOk(newPassword);
            if (typeof message === "string") {
                setConfirmPasswordClassName("input-warning");
                setConfirmPasswordMessage(message);
                setIsEditing2(false);
            } else {
                setConfirmPasswordClassName("input-ok");
                setConfirmPasswordMessage("");
                setIsEditing2(true);
            }
            if (newPassword === '' || formData2.prevPassword === '') {
                setIsEditing2(false);
            }
        }, 1700);
    };


    useEffect(() => {
        if (!user) {
            navigate.push("/loginSignup?message=profile");
        }
        if (usernameClassname === 'usernameInput' && phoneNumberClassName === 'usernameInput' && emailClassname === 'usernameInput') {
            setIsEditing(false);
        }

    }, [navigate, user, usernameClassname, phoneNumberClassName, emailClassname]);


    return (
        <div className="app__profile sm:mt-[8.5rem] mt-[7.5rem]">
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openAlertModal}
                onClose={onClose}
                autoHideDuration={3000}
            >
                <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>{displayMessage}</Alert>

            </Snackbar>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="profile_intro">
                    <div className={`${profileImgClassname2} flex w-full justify-center place-items-center`}>
                        {user === null ? (
                            <Image
                                className="intro_image"
                                width={40}
                                height={40}
                                src={Images.profile}
                                alt="profile_image" />
                        ) : (

                            <Avatar className="intro_image" {...stringAvatar(user?.username)} />

                        )}
                        <button onClick={(e) => { setProfileImgClassname2("usernameInput"); setProfileImgClassname("mini_intro"); e.preventDefault() }}>
                            <Image className="edit2" src={Images.edit} alt="edit-icon" />
                        </button>
                    </div>

                    <div className={usernameClassname2}>
                        <div className="mini_details">
                            <p><b>{user?.username}</b></p>
                            <small>{user?.county}</small>
                        </div>
                        <button onClick={(e) => { setUsernameClassname2("usernameInput"); setUsernameClassname("mini_intro"); e.preventDefault() }}>
                            <Image className="edit1" src={Images.edit} alt="edit-icon" />
                        </button>
                    </div>

                    <div className={usernameClassname}>
                        <div className="mini_details">
                            <div>{usernameMessage && <small className="text-danger">{usernameMessage}</small>}</div>
                            <div className="mini_details2">
                                <Image className="icon2" src={Images.accountIcon} alt="profile-icon" />
                                <div className="mini_details3">
                                    <label className="label">New Username:</label>
                                    <input
                                        id="username"
                                        className="input"
                                        name="username"
                                        value={formData.username}
                                        type="text"
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <button onClick={(e) => { setUsernameClassname2("mini_intro"); setUsernameClassname("usernameInput"); setUsernameMessage(""); setFormData((prevData) => ({ ...prevData, username: user?.username, })); e.preventDefault() }}>
                                    <Image className="close" src={Images.closeIcon} alt="close-icon" />
                                </button>
                            </div>
                            {/* <div className="mini_details2">
                                <Image className="icon2" src={Images.locationIcon} alt="profile-icon" />
                                <div className="mini_details3">
                                    <label className="label">Location:</label>
                                    <input
                                        id="location"
                                        className="input"
                                        value={formData.location}
                                        type="text"
                                        placeholder="Location"
                                        name="location"
                                        onChange={handleLocationChange}
                                    />
                                </div>
                            </div> */}
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
                                <button onClick={(e) => { setPhoneNumberClassName2("usernameInput"); setPhoneNumberClassName("phone"); e.preventDefault() }}>
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
                            <label className="label">New Phone Number:</label>
                            <input
                                id="number"
                                className="input"
                                value={formData.phoneNumber}
                                type="number"
                                placeholder="Phonenumber"
                                name="phoneNumber"
                                onChange={handlePhoneNumberChange}
                            />
                        </div>
                        <button onClick={(e) => { setPhoneNumberClassName2("phone"); setPhoneNumberClassName("usernameInput"); setPhoneNumberMessage(""); setFormData((prevData) => ({ ...prevData, phoneNumber: user?.phoneNumber, })); e.preventDefault() }}>
                            <Image className="close" src={Images.closeIcon} alt="close-icon" />
                        </button>

                    </div>
                    <div className={emailClassname2}>
                        <Image className='email_icon' src={Images.emailIcon} alt="phone-icon" />
                        <div className="email_mini">
                            <h3><b>EMAIL</b></h3>
                            <div className="mail">
                                <p>{user?.email}</p>
                                <button onClick={(e) => { setEmailClassname2("usernameInput"); setEmailClassname("email"); e.preventDefault() }}>
                                    <Image className="edit1" src={Images.edit} alt="edit-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={emailClassname} >
                        <Image className='email_icon' src={Images.emailIcon} alt="profile-icon" />
                        <div className="email_mini">
                            {emailMessage && <small className="text-danger">{emailMessage}</small>}
                            <label className="label">New Email:</label>
                            <input
                                className="input"
                                type="string"
                                value={formData.email}
                                placeholder="Email"
                                name="email"
                                onChange={handleEmailChange}
                            />
                        </div>
                        <button onClick={(e) => { setEmailClassname2("email"); setEmailClassname("usernameInput"); setEmailMessage(""); setFormData((prevData) => ({ ...prevData, email: user?.email, })); e.preventDefault(); }}>
                            <Image className="close" src={Images.closeIcon} alt="close-icon" />
                        </button>
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
                            <select
                                className="input select"
                                // value={formData.county}
                                name="county"
                                onChange={handleCountyChange}>
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
                            <p>Current:&nbsp;{user?.county.charAt(0).toUpperCase() + user?.county.slice(1)}</p>
                        </div>
                    </div>
                    <div className={areaClassname}>
                        <div>
                            <h5>Area:</h5>
                        </div>
                        <div>
                            {areaMessage && <small className="text-danger">{areaMessage}</small>}
                            <Input
                                name="area"
                                onChange={handleAreaChange}
                                placeholder="E.g. Juja, Thika, Kilimani"
                                rightSection={
                                    <Tooltip label="Enter the town you're in!" position="top-end" withArrow>
                                        <div>
                                            <Image className="info" src={Images.info} alt="info-icon" />
                                        </div>
                                    </Tooltip>
                                }
                            />
                            <p>Current:&nbsp;{user?.area}</p>
                        </div>
                    </div>
                    <div className={landmarkClassname}>
                        <div>
                            <h5>Landmark:</h5>
                        </div>
                        <div>
                            {landmarkMessage && <small className="text-danger">{landmarkMessage}</small>}
                            <Input
                                name="landmark"
                                onChange={handleLandMarkChange}
                                placeholder="E.g. Building name"
                                rightSection={
                                    <Tooltip label="Enter a well known building near you!" position="top-end" withArrow>
                                        <div>
                                            <Image className="info" src={Images.info} alt="info-icon" />
                                        </div>
                                    </Tooltip>
                                }
                            />
                            <p>Current:&nbsp;{user?.landmark}</p>
                        </div>
                    </div>
                </div>
                <div className="bottom_details flex justify-between place-content-center">
                    <a onClick={function () { setIsEditing2(false);; open() }}>
                        <p className="change">Change password?</p>
                    </a>
                    <Button type='submit' className={`"save  text-md text-yellow ${isEditing ? 'bg-green' : 'bg-gray'} w-[10rem]`} disabled={!isEditing}>
                        {!isSubmitting ? <p>Save Changes</p> : <CircularProgress color="inherit" size={20} />}
                    </Button>

                </div>
            </form>

            <Modal
                size="md"
                className="modal2"
                opened={opened}
                onClose={close}
                title="Password Reset"
                centered
                transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
            >
                <form onSubmit={handleForm2Submit} encType="multipart/form-data">
                    <div className="new">
                        <div>
                            {passwordMessage && <small className="text-danger">{passwordMessage}</small>}
                            <PasswordInput
                                label="Old Password"
                                description="Password must include at least one letter, number and special character!!"
                                withAsterisk
                                data-autofocus
                                onChange={handlePrevPasswordChange}
                                placeholder="Enter your previous password..."
                                visibilityToggleIcon={({ reveal, size }) =>
                                    reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                                }
                            />
                        </div>
                    </div>
                    <div className="confirm">
                        <div>
                            <PasswordInput
                                label="New Password"
                                description="Password must include at least one letter, number and special character!!"
                                withAsterisk
                                onChange={handleNewPasswordChange}
                                placeholder="Enter your new password..."
                                visibilityToggleIcon={({ reveal, size }) =>
                                    reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                                }
                            />
                            {confirmPasswordMessage && (
                                <>
                                    <ul className="list-disc text-danger list-inside">
                                        {confirmPasswordMessage.split(",").map((message, index) => (
                                            <li key={index}>{message}</li>
                                        ))}
                                    </ul>
                                    <br />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="submit mt-4">
                        <Group position="center">
                            <Button disabled={!isEditing2} className={`save  text-md text-yellow ${!isEditing2 ? 'bg-gray' : 'bg-green'} w-[10rem]`} type='submit'>
                                {!isSubmitting2 && <p>Submit</p>}
                                {isSubmitting2 && <CircularProgress color="inherit" size={20} />}
                            </Button>
                        </Group>
                    </div>

                </form>
            </Modal>

        </div>
    );
}

export default ViewUserProfile;