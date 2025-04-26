export interface AIRecommendedMeal {
    meal_name: string,
    meal_type: string,
    ingredients: string[],
    portion: string,
    preparation_steps: string[],
    prep_time_minutes: number,
    goal_support: string
}

export interface RecommendedMealResponse {
    _id: string,
    userId: string,
    recommendedMeals: AIRecommendedMeal[]
}