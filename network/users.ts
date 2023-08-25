import { fetchData } from "./fetchData";
import { User } from "../models/user";
import { loginCredentials } from "../models/loginCredentials";
import { profileCredentials } from "@/models/profileCredentials";
import { signedUrl } from "../models/signedUrl";

// getting an authenticated user
export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData(`/api/v1/users/`, { method: 'GET' });
    return response.json();
}

// login function
export async function login(credentials: loginCredentials): Promise<User> {
    const response = await fetchData('/api/v1/users/login',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

    return response.json();
}

// signing up a user
export async function signUp(credentials: FormData): Promise<User> {
    const response = await fetchData('/api/v1/users/signup', {
        method: 'POST',
        body: credentials
    });

    return response.json();
}


// logout function
export async function logout() {
    await fetchData('/api/v1/users/logout', { method: 'POST' });
}


// get profile pic signed url
export async function getUserProfileImageSignedUrl(key: string): Promise<signedUrl> {
    const response = await fetchData(`/api/v1/users/signedUrl/${key}`);
    return response.json();
}

// // fetching user profile image
// export async function getUserProfileImage(key: string) {
//     const signedUrl = await getUserProfileImageSignedUrl(key);
//     return signedUrl.url;
// }

// update user's profile
export async function updateProfile(credentials: object, userId: string): Promise<User> {
    const response = await fetchData(`/api/v1/users/update/${userId}`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

    return response.json();
}