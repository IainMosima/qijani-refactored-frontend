"use client";
import { Images } from "@/constants";
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { updateProfile } from '@/network/users';
import isPasswordOk from '@/utils/isPasswordOk';
import { Button, Group, Input, Modal, PasswordInput, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import isEmailValid from "../../utils/isEmailValid";
import "./Profile.scss";
import { userLogin } from "@/redux/reducers/loginReducer";
import { Avatar } from "@mui/material";
import stringAvatar from "../../utils/stringToColor";
import { IconEyeCheck, IconEyeOff } from '@tabler/icons-react';


const ViewUserProfile = () => {
    const user = useAppSelector((state) => state.login.user)!;
    const dispatch = useAppDispatch();

    const [profileImgClassname, setProfileImgClassname] = useState("usernameInput");
    const [profileImgClassname2, setProfileImgClassname2] = useState("mini_intro");

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

    const [displayMessage, setDisplayMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [showMessage2, setShowMessage2] = useState(false);
    const [disabled, setDisabled] = useState(false);



    const [opened, { open, close }] = useDisclosure(false);

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

    const {
        formState: { isSubmitting },
    } = useForm();

    const navigate = useRouter();

    const handleUsernameChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            username: event.target.value,
        }));
        const username = event.target.value;

        setTimeout(() => {
            if (username.length < 5) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Username must be at least 5 characters!!");
            } else {
                setUsernameClassname("input-ok, mini_intro");
                setUsernameMessage("");
            }
        }, 1500);
    };

    const handleLocationChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            location: event.target.value,
        }));
        const location = event.target.value;

        setTimeout(() => {
            if (location.length < 3) {
                setUsernameClassname("input-warning, mini_intro");
                setUsernameMessage("Location must be at least 3 characters!!");
            } else {
                setUsernameClassname("input-ok, mini_intro");
                setUsernameMessage("");
            }
        }, 1500);
    };

    const handleEmailChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            email: event.target.value,
        }));
        const email = event.target.value;
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
    };

    const handlePhoneNumberChange = (event: { target: { value: any; }; }) => {
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
            } else {
                setPhoneNumberClassName("input-ok, phone");
                setPhoneNumberMessage("");
            }
        }, 2000);
    };

    const handleCountyChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            county: event.target.value,
        }));
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
    };

    const handleAreaChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            area: event.target.value,
        }));
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
    };

    const handleLandMarkChange = (event: { target: { value: any; }; }) => {
        setFormData((prevData) => ({
            ...prevData,
            landmark: event.target.value,
        }));
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
    };

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        dispatch(userLogin({ ...user, county: formData.county, area: formData.area, landmark: formData.landmark }));
        try {
            const client = await updateProfile(formData, user?._id!);

            if (client) {
                setDisplayMessage("Profile updated successfully!!");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
                // window.location.reload();
                console.log(client);
            }
        } catch (error) {
            setDisplayMessage("Error updating profile!!!");
            setShowMessage2(true);
            setTimeout(() => {
                setShowMessage2(false);
            }, 3000);
            console.error(error);
            // window.location.reload();
        }
    };

    const handleForm2Submit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await updateProfile(formData2, user?._id!);

            if (response) {
                close();
                setDisplayMessage("Password updated successfully!!");
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            }
        } catch (error) {
            close();
            setDisplayMessage("Error updating password!!!");
            setShowMessage2(true);
            setTimeout(() => {
                setShowMessage2(false);
            }, 3000);
            console.error(error);
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
                setDisabled(true);
            } else {
                setPasswordClassname("input-ok");
                setPasswordMessage("");
            }
        }, 1000);
    };

    const handleNewPasswordChange = (event: { target: { value: any; }; }) => {
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
                setDisabled(true);
            } else {
                setConfirmPasswordClassName("input-ok");
                setConfirmPasswordMessage("");
                setDisabled(false);
            }
            if (newPassword === '' || formData2.prevPassword === '') {
                setDisabled(true);
            }
        }, 1700);
    };
    // const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         profileImgKey: event.target.value,
    //     }));
    // }

    // useEffect(() => {
    //     dispatch(userLogin({ ...user, county: formData.county, area: formData.area, landmark: formData.landmark }));
    // }, [])


    useEffect(() => {
        if (!user) {
            navigate.push("/loginSignup");
        }
    }, [navigate, user]);



    return (
        <div className="app__profile sm:mt-[8.5rem] mt-[7.5rem]">
            {showMessage &&
                <div className="message">
                    <h3 className="h3">{displayMessage}</h3>
                </div>
            }
            {showMessage2 &&
                <div className="message2">
                    <h3>{displayMessage}</h3>
                </div>
            }
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <div className="profile_intro">
                    <div className={profileImgClassname2}>
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

                    {/* <div className={profileImgClassname}>
                        <p>Profile picture:</p>
                        <input
                            type="file"
                            placeholder="profile image"
                            onChange={handleProfileImageChange}
                        />
                    </div> */}

                    <div className={usernameClassname2}>
                        <div className="mini_details">
                            <p><b>{user?.username}</b></p>
                            <small>{user?.location}</small>
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
                                    <label className="label">Username:</label>
                                    <input
                                        id="username"
                                        className="input"
                                        name="username"
                                        value={formData.username}
                                        type="text"
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                            </div>
                            <div className="mini_details2">
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
                            <label className="label">Phone Number:</label>
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
                            <label className="label">Email:</label>
                            <input
                                className="input"
                                type="string"
                                value={formData.email}
                                placeholder="Email"
                                name="email"
                                onChange={handleEmailChange}
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
                            <select
                                className="input select"
                                value={formData.county}
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
                            <p>Current:&nbsp;{user?.county}</p>
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
                <div className="bottom_details">
                    <a onClick={function () { setDisabled(true); open() }}>
                        <p className="change">Change password?</p>
                    </a>
                    <Button type='submit' className="save" variant="white" color="gray">
                        {!isSubmitting && <p>Save Changes</p>}
                        {isSubmitting && <CircularProgress color="inherit" />}
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
            ><form onSubmit={handleForm2Submit} encType="multipart/form-data">
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
                            {confirmPasswordMessage && <small className="text-danger">{confirmPasswordMessage}</small>}
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
                        </div>
                    </div>

                    <div className="submit mt-4">
                        <Group position="center">
                            <Button disabled={disabled} variant="outline" type='submit'>
                                {!isSubmitting && <p>Submit</p>}
                                {isSubmitting && <CircularProgress color="inherit" />}
                            </Button>
                        </Group>
                    </div>

                </form>
            </Modal>

        </div>
    );
}

export default ViewUserProfile;