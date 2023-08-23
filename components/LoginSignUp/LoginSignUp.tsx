'use client';
import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./Signup";

import "./forms.scss";
import { User } from "../../models/user";
import { PackageStructure } from "../../models/package";
import { useAppSelector } from "@/hooks/reduxHook";
import { useRouter } from "next/navigation";

interface LoginSignUpProps {
    message?: string,
}

const LoginSignUp = ({ message }: LoginSignUpProps) => {
    const [loginToggle, setLoginToggle] = useState(true);
    const [signUpToggle, setSignUpToggle] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(true);
    const loggedInUser = useAppSelector(state => state.login.user)



    const navigate = useRouter();
    let displayMessage;

    const messages = {
        packages: 'Login to access packages',
        add: 'Login to add an item to a package',
        orders: 'Login to access orders',
        profile: 'Login to view profile page',
    }

    if (message === 'packages') {
        displayMessage = messages.packages;

    } else if (message === 'add') {
        displayMessage = messages.add;

    } else if (message === 'orders') {
        displayMessage = messages.orders;

    } else if (message === 'profile') {
        displayMessage = messages.profile;

    }


    if (loggedInUser) {
        if (message === 'packages') {
            navigate.push('/packages');
        } else if (message === 'orders') {
            navigate.push('/orders');
        } else {
            navigate.push('/');
        }
    }

    useEffect(() => {
        const messageTimer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        return () => clearTimeout(messageTimer);

    }, [errorText])





    function toggleHandler(option: string) {
        switch (option) {
            case 'login':
                setLoginToggle(true);
                setSignUpToggle(false);
                break;

            case 'signup':
                setSignUpToggle(true);
                setLoginToggle(false);
                break;

            default:
                setSignUpToggle(false);
                setLoginToggle(false);
        }
    }

    return (
        <div className="app__loginSignUp login-only">
            {showMessage &&
                <h3 className="message">{displayMessage}</h3>
            }
            {errorText &&
                <h3 className="message">{errorText}</h3>
            }
            <div className="body">
                <div className="navigators">
                    <h3
                        className={loginToggle ? 'active' : ''}
                        onClick={() => toggleHandler('login')}
                    >login</h3>
                    <h3
                        className={signUpToggle ? 'active' : ''}
                        onClick={() => toggleHandler('signup')}
                    >signup</h3>
                </div>

                {loginToggle &&
                    <LoginForm
                        setErrorText={setErrorText}
                    />
                }

                {signUpToggle &&
                    <SignUpForm />
                }

            </div>
        </div>
    );
}

export default LoginSignUp;