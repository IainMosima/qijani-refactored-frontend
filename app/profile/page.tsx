import ViewUserProfile from '@/components/Profile/Profile';
import React from 'react';
import { User } from "@/models/user";
import { useAppSelector } from "@/hooks/reduxHook";

export default function viewUserProfile() {
    // const loggedInUser = useAppSelector((state) => state.login.user);
    return (
        <>
            <ViewUserProfile /*loggedInUser={loggedInUser} */ />
        </>
    )
}