import { loginCredentials } from "../models/loginCredentials";
import { signedUrl } from "../models/signedUrl";
import { User } from "../models/user";
import { fetchData } from "./fetchData";


// getting an authenticated user
export async function getLoggedInUser(token: string): Promise<User> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/`, { headers: { 'Authorization': 'Bearer ' + token }, method: 'GET' });
    return response.json();
}

// login function
export async function login(credentials: loginCredentials): Promise<string> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/login`,
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
export async function signUp(credentials: FormData): Promise<string> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/signup`, {
        method: 'POST',
        body: credentials
    });

    return response.json();
}


// get profile pic signed url
export async function getUserProfileImageSignedUrl(key: string): Promise<signedUrl> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/signedUrl/${key}`);
    return response.json();
}


// update user's profile
export async function updateProfile(credentials: object, userId: string): Promise<User> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/update/${userId}`,
        {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

    return response.json();
}

// check if a user's username exists
export async function checkUsername(username: string): Promise<boolean> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/checkusername/${username}`, { method: 'GET' });
    return response.json();
}

// check if a user's email exists
export async function checkEmail(username: string): Promise<boolean> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/users/checkemail/${username}`, { method: 'GET' });
    return response.json();
}