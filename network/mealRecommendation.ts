import { RecommendedMealResponse } from "@/models/mealRecommedation";
import { fetchData } from "./fetchData";

// getting meal recommendations
export async function getMealRecommendations(token: string): Promise<RecommendedMealResponse> {
    try {
        const response = await fetchData(`${process.env.BACKEND_API}/api/v1/mealRecommendations/`, { 
            headers: { 'Authorization': 'Bearer ' + token },
            method: 'GET' 
        });
        const responseJson = await response.json();

        if (Array.isArray(responseJson)) {
            return responseJson[0] as RecommendedMealResponse;
        }

        return responseJson as RecommendedMealResponse;
    } catch (error) {
        return {} as RecommendedMealResponse;
    }
}
