import { createMealProfile, savedMealProfile } from "../models/mealProfile";
import { fetchData } from "./fetchData";

// getting a meal profile
export async function getMealProfile(token: string): Promise<savedMealProfile> {
    try {
        const response = await fetchData(`${process.env.BACKEND_API}/api/v1/mealProfile/`, { 
            headers: { 'Authorization': 'Bearer ' + token },
            method: 'GET' 
        });
        return response.json();
    } catch (error) {
        return {} as savedMealProfile;
    }
}

// creating a new meal profile
export async function createMealProfileRequest(mealProfileBody: createMealProfile, token: string) {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/mealProfile/`, 
    {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json',
        },
        body: JSON.stringify(mealProfileBody)
    });

    return response.json();
}

// updating a meal profile
export async function updateMealProfile(mealProfileId: string, mealProfileBody: createMealProfile, token: string) {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/mealProfile/`, 
    {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json',
        },
        body: JSON.stringify(mealProfileBody)
    });

    return response.json();
}
