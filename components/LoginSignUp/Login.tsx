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


interface LoginProps {
    setErrorText: React.Dispatch<React.SetStateAction<string | null>>,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    setmyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>,
}



const LoginForm = ({setErrorText, setLoggedInUser, setmyPackages } : LoginProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginCredentials>();

    const registerOptions = {
        usernameEmail: { required: 'Name or UserName is required' },
        password: { required: 'Password is required' },
    }

    async function onSubmit(credentials: loginCredentials) {
        try {
            const user = await login(credentials);

            if (user) {
                if (user.profileImageKey) {
                    const signedUrl = await getUserProfileImageSignedUrl(user.profileImageKey);
                    setLoggedInUser({
                      ...user, 
                      profileImageKey: signedUrl.url
                    });
                  } else {
                    setLoggedInUser(user);
                }
                const myPackages = await fetchPackages();
                if (myPackages) setmyPackages(myPackages);
            }

        } catch (err) {
            if (err instanceof UnauthorizedError) {
                setErrorText('Invalid credentials, try again');
            } else {
                alert(err);
                console.error(err);
                
            }
        }
    }

    
    return ( 
        <div className="app__loginSignUp">
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.usernameEmail &&
                    <p className="text-danger">Email or Username is required</p>
                }
                <div>
                    <Image src={Images.accountIcon} alt='profile-icon'/>
                    <input type='text' placeholder="Username or Email"
                     {...register('usernameEmail', registerOptions.usernameEmail)}/>
                </div>
                
                
                {errors.password &&
                    <p className="text-danger">Password is required</p>
                }        
                <div>
                    <Image src={Images.passwordLockIcon} alt='profile-icon'/>
                    <input type='password' placeholder="Password" 
                     {...register('password', registerOptions.password)}
                    />
                </div>

                <button disabled={isSubmitting}>
                    {!isSubmitting &&
                        <p>Log In</p>
                    }
                    {isSubmitting &&
                        <CircularProgress color="inherit"/>
                    }
                </button>
            </form>
        </div>
     );
}
 
export default LoginForm;
