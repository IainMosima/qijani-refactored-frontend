"use client";
import { useAppSelector } from '@/hooks/reduxHook';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { Images } from "../../constants";
import { useEffect } from 'react';

const BottomNav = () => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const navigate = useRouter();
    const loggedInUser = useAppSelector((state) => state.login.user);

    function packageOnClickHandler() {
        if (!loggedInUser) {
            navigate.push("/loginSignup?message=packages");
        } else {
            navigate.push("/packages");
        }
    }

    function ordersOnClickHandler() {
        if (!loggedInUser) {
            navigate.push("/loginSignup?message=orders");
        } else {
            navigate.push("/orders");
        }
    }

    function profileOnClickHandler() {
        if (!loggedInUser) {
            navigate.push("/loginSignup?message=profile");
        } else {
            navigate.push("/profile");
        }
    }

    function homeNavigation() {
        navigate.push("/");
    }

    useEffect(() => {
        if (window.location.pathname === "/profile") {
            setValue("profile");
        } else if (window.location.pathname === "/orders") {
            setValue("orders");
        } else if (window.location.pathname === "/packages") {
            setValue("packages");
        } else if (window.location.pathname === "/home") {
            setValue("home");
        }
        console.log(window.location.pathname)

    }, []);



    return (

        <Paper className="bottomnav lg:hidden" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<Image src={Images.homeIcon} alt='packages' width={30} height={30} />}
                    onClick={() => homeNavigation()}
                />

                <BottomNavigationAction
                    label="Packages"
                    value="packages"
                    icon={<Image src={Images.packagesIcon} alt='packages' width={30} height={30} />}
                    onClick={() => packageOnClickHandler()}
                />

                <BottomNavigationAction
                    label="Orders"
                    value="orders"
                    icon={<Image src={Images.orderIcon} alt='packages' width={30} height={30} />}
                    onClick={() => ordersOnClickHandler()}
                />

                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<Image src={Images.profileDefault} alt='packages' width={30} height={30} />}
                    onClick={() => profileOnClickHandler()}
                />

            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;