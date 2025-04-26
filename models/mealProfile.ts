export interface createMealProfile {
    age: Number,
    gender: string,
    heightCm: number,
    weightKg: number,
    activityLevel: string,
    dietaryPrefernces: string[],
    allergies: string[],
    healthConditions: string[],
    weightGoal: string
}

export interface savedMealProfile {
    _id: string,
    age: Number,
    gender: string,
    heightCm: number,
    weightKg: number,
    activityLevel: string,
    dietaryPrefernces: string[],
    allergies: string[],
    healthConditions: string[],
    weightGoal: string
}
