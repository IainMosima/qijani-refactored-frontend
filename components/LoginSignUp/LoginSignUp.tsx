'use client';
import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./Signup";

import { useAppSelector } from "@/hooks/reduxHook";
import { useRouter } from "next/navigation";
import "./forms.scss";

interface LoginSignUpProps {
    message?: string,
}

const LoginSignUp = ({ message }: LoginSignUpProps) => {
    const [loginToggle, setLoginToggle] = useState(true);
    const [signUpToggle, setSignUpToggle] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(true);
    const loggedInUser = useAppSelector(state => state.login.user);
    const [displayMessage, setDisplayMessage] = useState('');


    const navigate = useRouter();


    const messages = {
        packages: 'Login to access packages',
        add: 'Login to add an item to a package',
        orders: 'Login to access orders',
        profile: 'Login to view profile page',
    }

    useEffect(() => {
        function messager() {
            if (message === 'packages') {
                setDisplayMessage(messages.packages);

            } else if (message === 'add') {
                setDisplayMessage(messages.add);
            } else if (message === 'orders') {
                setDisplayMessage(messages.orders);
            } else if (message === 'profile') {
                setDisplayMessage(messages.profile);
            }

            if (loggedInUser) {
                if (message === 'packages') {
                    navigate.push('/packages');
                } else if (message === 'orders') {
                    navigate.push('/orders');
                } else if (message === 'profile') {
                    navigate.push('/profile');
                } else {
                    navigate.push('/');
                }
            }
        }
        messager();
        const messageTimer = setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        return () => clearTimeout(messageTimer);

    }, [errorText, loggedInUser, message, messages.add, messages.orders, messages.packages, messages.profile, navigate]);

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
        <div className="app__loginSignUp bg-white sm:mt-[10rem] mt-[7rem]">
            {showMessage &&
                <h3 className="message">{displayMessage}</h3>
            }
            {errorText &&
                <h3 className="message">{errorText}</h3>
            }
            <div className="body sm:w-[30rem] w-[22.5rem]">
                <div className="navigators sm:gap-[10rem] gap-[7rem]">
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