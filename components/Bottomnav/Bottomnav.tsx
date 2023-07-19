"use client";
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';

const BottomNav = () => {
    const [value, setValue] = React.useState('home');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation value={value} onChange={handleChange} showLabels>
                <BottomNavigationAction
                    label="Home"
                    value="home"
                    icon={<HomeIcon />}
                />
                <BottomNavigationAction
                    label="Categories"
                    value="categories"
                    icon={<CategoryIcon />}
                />
                <BottomNavigationAction
                    label="Packages"
                    value="packages"
                    icon={<InventoryIcon />}
                />
                <BottomNavigationAction
                    label="Profile"
                    value="profile"
                    icon={<AccountBoxIcon />}
                />
            </BottomNavigation>
        </Paper>
    );
}

export default BottomNav;