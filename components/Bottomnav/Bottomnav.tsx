"use client";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useAppSelector } from '@/hooks/reduxHook';
// import { useRouter } from 'next/navigation';

const BottomNav = () => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }

    const loggedInUser = useAppSelector((state) => state.login.user);


    // const router = useRouter();

    return (
        <Paper className="bottomnav lg:hidden" sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <Link href="/">
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon />}
                    />
                </Link>

                <Link href="/categories">
                    <BottomNavigationAction
                        label="Categories"
                        value="categories"
                        icon={<CategoryIcon />}
                    />
                </Link>

                <Link href="/packages">
                    <BottomNavigationAction
                        label="Packages"
                        value="packages"
                        icon={<InventoryIcon />}
                    />
                </Link>

                {loggedInUser === null ? (
                    <Link href="/loginSignup">
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountBoxIcon />}
                        />
                    </Link>
                ) : (
                    <Link href="/profile">
                        <BottomNavigationAction
                            label="Profile"
                            value="profile"
                            icon={<AccountBoxIcon />}
                        />
                    </Link>
                )}

            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;