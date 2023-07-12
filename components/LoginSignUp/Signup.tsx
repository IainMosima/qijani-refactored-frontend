import { useState } from "react";
import { Images } from "../../constants";
import isPasswordOk from "../../utils/isPasswordOk";
import { getUserProfileImageSignedUrl, signUp } from "../../network/users";
import isEmailValid from "../../utils/isEmailValid";
import "./forms.scss";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CircularProgress from '@mui/material/CircularProgress';

import { User } from "../../models/user";
import Image from "next/image";


interface SignUpFormProps {
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,

}

const SignUpForm = ({ setLoggedInUser }: SignUpFormProps) => {
    const [usernameClassname, setUsernameClassname] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');

    const [emailClassname, setEmailClassname] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    const [phoneNumberClassName, setPhoneNumberClassName] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

    const [passwordClassname, setPasswordClassname] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [password, setPassword] = useState('');
    
    const [confirmPasswordClassName, setConfirmPasswordClassName] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    const [selectedProfileImage, setSelectedProfileImage] = useState<File | undefined>();


    const { register, handleSubmit, formState: { isSubmitting }} = useForm();


    const onSubmit: SubmitHandler<FieldValues> = async (credentials: FieldValues) => {
        const formData = new FormData();
        formData.append('username', credentials.username);
        formData.append('email', credentials.email);
        formData.append('phoneNumber', credentials.phoneNumber);
        formData.append('location', credentials.location);
        formData.append('password', credentials.password);
        formData.append('profileImg', credentials.profileImg[0]);

        
        try {
            const user = await signUp(formData);

            if (user){
                if (user.profileImageKey) {
                    const signedUrl = await getUserProfileImageSignedUrl(user.profileImageKey);
                    setLoggedInUser({
                      ...user, 
                      profileImageKey: signedUrl.url
                    });
                  } else {
                    setLoggedInUser(user);
                }
            }
            
        } catch (error) {
            console.error(error);
            
        }
        
    }


    function onUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        const username = event.target.value;

        setTimeout(() => {

            if (username.length < 5) {
                setUsernameClassname('input-warning');
                setUsernameMessage('Username must be at least 5 characters');
            } else {
                setUsernameClassname('input-ok');
                setUsernameMessage('');
            }
        }, 1500);
        
    }

    function onEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const  email = event.target.value;
        const validEmail = isEmailValid(email);

        setTimeout(() => {
            if(!validEmail){
                setEmailClassname('input-warning');
                setEmailMessage('Enter a valid email address');
            } else {
                setEmailClassname('input-ok');
                setEmailMessage('');
            }
        }, 1500);
        
    }


    function onPhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        const phoneNumber = event.target.value;
        const numbers = ['0','1','2','3','4','5','6','7','8','9'];
        const intPhoneNumber = parseInt(phoneNumber);

        
        setTimeout(() => {
            // condtion checking for mobile numbers
            if(intPhoneNumber.toString().length !== 9 || !numbers.includes(phoneNumber[phoneNumber.length - 1]) || (phoneNumber[0] !== '7' && phoneNumber[0] !== '1')) {
                setPhoneNumberClassName('input-warning');
                setPhoneNumberMessage('Enter a valid phone number');
            } else {
                setPhoneNumberClassName('input-ok');
                setPhoneNumberMessage('');
            }
        }, 2000)
    }

    function onPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        const password = event.target.value;

        setTimeout(() => {
            const message = isPasswordOk(password);
            if(typeof message === 'string') {
                setPasswordClassname('input-warning');
                setPasswordMessage(message);
            } else {
                setPasswordClassname('input-ok');
                setPasswordMessage('');
                setPassword(password);
            }
        }, 1700)
    }
    

    function confirmPasswordChange(event: any) {
        const confirmPassword = event.target.value;

        setTimeout(() => {
            if(confirmPassword !== password) {
                setConfirmPasswordClassName('input-warning');
                setConfirmPasswordMessage('Passwords do not match');
            } else {
                setConfirmPasswordClassName('input-ok');
                setConfirmPasswordMessage('');
            }
        }, 1000);
    }

    function profileImageChange(event: React.ChangeEvent<HTMLInputElement>) {
        let file;
        if (event.target.files && event.target.files[0]) {
          file = event.target.files[0];
        }
        if (file) {
            setSelectedProfileImage(file);
        }
      }
      


    return ( 
        <div className="app__loginSignUp">
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {usernameMessage &&
                    <p className="text-danger">{usernameMessage}</p>
                }
                <div className={usernameClassname}>
                    <Image src={Images.accountIcon} alt='profile-icon'/>
                    <input type='text' placeholder="Username" required {...register('username', { onChange: onUsernameChange })}/>
                    

                </div>

                {emailMessage &&
                    <p className="text-danger">{emailMessage}</p>
                }
                <div className={emailClassname}>
                    <Image src={Images.emailIcon} alt='profile-icon'/>
                    <input type='email' placeholder="Email" required {...register('email', { onChange:  onEmailChange })}/>
                </div>

                {phoneNumberMessage &&
                    <p className="text-danger">{phoneNumberMessage}</p>
                }
                <div className={phoneNumberClassName}>
                    <Image src={Images.phoneIcon} alt='profile-icon'/>
                    <p className="mobile-number">+254</p>
                    <input type='text' placeholder="Mpesa Number" {...register('phoneNumber', { onChange: onPhoneNumberChange })}/>
                </div>
                        
                {passwordMessage &&
                    <p className="text-danger">{passwordMessage}</p>
                }
                <div className={passwordClassname}>
                    <Image src={Images.passwordLockIcon} alt='profile-icon'/>
                    <input type='password' placeholder="Password" {...register('password', { onChange: onPasswordChange })}/>
                </div>

                {confirmPasswordMessage &&
                    <p className="text-danger">{confirmPasswordMessage}</p>
                }
                <div className={confirmPasswordClassName}>
                    <Image src={Images.passwordLockIcon} alt='profile-icon'/>
                    <input type='password' placeholder="Confirm Password" onChange={confirmPasswordChange} />
                </div>

                <div>
                    <p>Profile picture</p>
                    <input type='file' placeholder="profile" {...register('profileImg', { onChange: profileImageChange })}/>
                </div>
                {selectedProfileImage && (
                    <div>
                        <p>Profile Image:</p>
                        <Image src={URL.createObjectURL(selectedProfileImage)} alt="Preview" />

                    </div>
                )}   

                <button>
                    {!isSubmitting &&
                        <p>Sign Up</p>
                    }
                    {isSubmitting &&
                        <CircularProgress color="inherit"/>
                    }
                </button>
            </form>
        </div>
     );
}
 
export default SignUpForm;