import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignUpForm from "./Signup";

import "./forms.scss";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../models/user";
import { PackageStructure } from "../../models/package";

interface LoginSignUpProps {
    menuToggle: boolean,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    loggedInUser: User | null,
    setMyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>,
}

const LoginSignUp = ({ menuToggle, loggedInUser, setLoggedInUser, setMyPackages: setmyPackages }: LoginSignUpProps) => {
    const [loginToggle, setLoginToggle] = useState(true);
    const [signUpToggle, setSignUpToggle] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [showMessage, setShowMessage] = useState(true);
    let message;
    
    const { from } = useParams();
    const navigate = useNavigate();

    const messages = {
        packages: 'Login in to access packages',
        add: 'Login to add an item to a package'
    }

    if (from === 'packages') {
        message = messages.packages;

    } else if (from === 'add') {
        message = messages.add;
    } 
    
    if (loggedInUser) {
        if (from === 'packages') {
            navigate('/packages');
        } else {
            navigate('/');
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
                <h3 className="message">{message}</h3>
            }
            {errorText &&
                <h3 className="message">{errorText}</h3>
            }
            <div className="body">
                <div className="navigators">
                    <h3 
                     className={loginToggle ? 'active': ''}
                     onClick={()=>toggleHandler('login')}
                     >login</h3>
                    <h3
                     className={signUpToggle ? 'active' : ''}
                     style={menuToggle ? { position: 'static' } : { position: 'relative' }} 
                     onClick={()=>toggleHandler('signup')}
                    >signup</h3>
                </div>
                
                {loginToggle &&
                    <LoginForm
                     setErrorText={setErrorText}
                     setLoggedInUser={setLoggedInUser}
                     setmyPackages={setmyPackages}
                    />
                }

                {signUpToggle &&
                    <SignUpForm
                     setLoggedInUser={setLoggedInUser}
                    />
                }
                
            </div>
        </div>
     );
}
 
export default LoginSignUp;