import React, { useState } from "react";

const QuizForm = () => {
  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    activity_level: "",
    dietary_preferences: [] as string[],
    allergies: "",
    health_conditions: "",
    weight_goal: "",
    past_meals: ""
  };
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState(initialFormData);

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Pescatarian", "Keto", "Paleo",
    "Gluten-Free", "Dairy-Free", "Nut-Free", "Halal", "Kosher",
    "Low-Carb", "Low-Fat", "High-Protein", "Mediterranean", "FODMAP", "Sugar-Free"
  ];

  const activityLevels = [
    "Sedentary", "Lightly active", "Moderately active", "Very active", "Super active"
  ];

  const weightGoals = ["Lose weight", "Maintain weight", "Gain muscle"];

  
  const questions = [
    {
      label: "What's your full name?",
      type: "text",
      name: "name"
    },
    {
      label: "How old are you? ",
      type: "number",
      name: "age",
      min: 0,
      max: 120
    },
    {
      label: "What's your gender?",
      type: "select",
      name: "gender",
      options: ["Male", "Female", "Other"]
    },
    {
      label: "What's your height in cm? ",
      type: "number",
      name: "height_cm",
      min: 51,
      max: 249
    },
    {
      label: "What's your weight in kg? ",
      type: "number",
      name: "weight_kg",
      min: 21,
      max: 299
    },
    {
      label: "How active are you?",
      type: "select",
      name: "activity_level",
      options: activityLevels
    },
    {
      label: "Select dietary preferences",
      type: "multi-select",
      name: "dietary_preferences",
      options: dietaryOptions
    },
    {
      label: "Any allergies? ",
      type: "text",
      name: "allergies"
    },
    {
      label: "Any health conditions? ",
      type: "text",
      name: "health_conditions"
    },
    {
      label: "What's your weight goal?",
      type: "select",
      name: "weight_goal",
      options: weightGoals
    },
    {
      label: "What meals have you eaten recently? ",
      type: "text",
      name: "past_meals"
    }
  ];

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, selectedOptions } = e.target as any;
    if (type === "select-multiple") {
      const values = Array.from(selectedOptions).map((opt: any) => opt.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, questions.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Quiz submitted! Check console for details.");
    setFormData(initialFormData)
    setStep(0);
  };

  const current = questions[step];

  return (
    <div className="quiz-form p-6 bg-white rounded shadow max-w-xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Quiz ({step + 1}/{questions.length})</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium mb-2">{current.label}</label>
        {current.type === "select" ? (
          <select
            name={current.name}
            value={(formData as any)[current.name]}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select...</option>
            {current.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : current.type === "multi-select" ? (
          <select
            multiple
            name={current.name}
            value={(formData as any)[current.name]}
            onChange={handleChange}
            className="input"
          >
            {current.options?.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={current.type}
            name={current.name}
            value={(formData as any)[current.name]}
            onChange={handleChange}
            className="input"
            required={current.name !== "name"}
            min={current.min}
            max={current.max}
          />
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </button>
          {step < questions.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#004523] text-white px-4 py-2 rounded"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="bg-[#004523] text-white px-4 py-2 rounded">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
