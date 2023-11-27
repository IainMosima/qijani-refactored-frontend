import React, { useState } from "react";

interface Preference {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface MealCardProps {
  mealType: string;
  preferenceIcon?: string;
}

const MealCard: React.FC<MealCardProps> = ({ mealType, preferenceIcon }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-2 flex items-center justify-between">
      <h3 className="font-semibold text-lg">{mealType}</h3>
      {mealType !== "Breakfast" && (
        <img
          src={preferenceIcon}
          alt={`${mealType} icon`}
          className="w-8 h-8"
        />
      )}
    </div>
  );
};

interface DayProps {
  date: Date;
  preference?: Preference | null;
}

const Day: React.FC<DayProps> = ({ date, preference }) => {
  const iconSrc = preference?.image || "default-icon.png"; // Replace with your default icon path

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg m-2">
      <h2 className="font-bold text-xl mb-3">{date.toLocaleDateString()}</h2>
      <MealCard mealType="Breakfast" />
      <MealCard mealType="Lunch" preferenceIcon={iconSrc} />
      <MealCard mealType="Dinner" preferenceIcon={iconSrc} />
    </div>
  );
};

const Plan: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference[]>([
    {
      id: 1,
      name: "Bachelor's corner",
      description: "Quick cuisine for one: Simplifying solo meals.",
      image: "./user.png",
    },
    {
      id: 2,
      name: "Family Favorites",
      description:
        "Cherished classics, for the whole family – smiles, flavors everyone loves!",
      image: "./fam.png",
    },
    {
      id: 3,
      name: "Vegetarian",
      description: "Savor the Greens, Elevate Your Vegetarian Cuisine!",
      image: "./vegan.png",
    },
    {
      id: 4,
      name: "Carnivore special",
      description: "Meat lovers rejoice! Enjoy our finest cuts of meat",
      image: "./meat1.png",
    },
    {
      id: 5,
      name: "Wellness",
      description:
        "Elevate your wellness journey with curated meal plans by nutrition experts.",
      image: "./well.png",
    },
  ]);

  const [selectedPreference, setSelectedPreference] = useState<number | null>(
    null
  );
  const [planLength, setPlanLength] = useState<number | null>(null);
  const [mealsPerDay, setMealsPerDay] = useState<number | null>(null);
  const [servingSize, setServingSize] = useState<number | null>(null);

  console.log("selectedPreference", selectedPreference);
  console.log("planLength", planLength);
  console.log("mealsPerDay", mealsPerDay);
  console.log("servingSize", servingSize);

  const MealCard = ({ mealType, preferenceIcon }: { mealType: string, preferenceIcon: string }) => {
    return (
      <div className="bg-white p-4 shadow-md rounded-lg mb-2 flex items-center justify-between">
        <h3 className="font-semibold text-lg">{mealType}</h3>
        {mealType !== "Breakfast" && (
          <img
            src={preferenceIcon}
            alt={`${mealType} icon`}
            className="w-8 h-8"
          />
        )}
      </div>
    );
  };

  interface DayProps {
    date: Date;
    preference?: {
      icon?: string;
    };
  }
  
  const Day: React.FC<DayProps> = ({ date, preference }) => {
    const iconSrc = preference?.icon || "default-icon.png"; // Replace with your default icon path
  
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg m-2">
        <h2 className="font-bold text-xl mb-3">{date.toLocaleDateString()}</h2>
        <MealCard mealType="Breakfast" preferenceIcon={""} />
        <MealCard mealType="Lunch" preferenceIcon={iconSrc} />
        <MealCard mealType="Dinner" preferenceIcon={iconSrc} />
      </div>
    );
  };
  

  // const renderWeekDays = () => {
  //   const today = new Date();
  //   const weekDays = [...Array(2)].map((_, i) => {
  //     const day = new Date(today);
  //     day.setDate(today.getDate() + i);
  //     return day;
  //   });

  //   return weekDays.map((dayDate, index) => (
  //     <Day
  //       key={index}
  //       date={dayDate}
  //       preference={preferences.find((p) => p.id === selectedPreference)}
  //     />
  //   ));
  // };

  const handlePreferenceSelect = (preference: { id: React.SetStateAction<number | null>; }) => {
    setSelectedPreference(preference.id);
  };

  const handlePlanLengthSelect = (length: React.SetStateAction<number | null>) => {
    setPlanLength(length);
  };

  const handleMealsPerDaySelect = (meals: React.SetStateAction<number | null>) => {
    setMealsPerDay(meals);
  };

  const handleServingSizeSelect = (serving: React.SetStateAction<number | null>) => {
    setServingSize(serving);
  };

  return (
    <>
      <div className="bg-[#F3F6F4]">
        <h4 className="text-[#004523] font-montserrat text-sm font-medium tracking-normal text-center py-10">
          Unlock a week of delicious delights!
        </h4>
        <p className="text-[#000000E6] font-poppins pb-5 text-center text-xs mx-10">
          Sign up for our weekly meal plans – where convenience meets culinary
          joy. Your taste buds will thank you!
        </p>
      </div>
      <div className="mx-5 mt-5">
        <h2 className="text-[#000] font-poppins text-sm">Preferences</h2>
        <p className="text-[#E9A820] text-sm font-poppins">
          Which category suits you best?
        </p>

        <div className="flex flex-col gap-2">
          {preferences.map((preference, i) => (
            <div
              key={i}
              className={`border flex items-center gap-3 ${
                selectedPreference === preference.id
                  ? "border-[#E9A820]"
                  : "border-black"
              } rounded-md `}
              onClick={() => handlePreferenceSelect(preference)}
            >
              <div className="w-[15%] mx-2">
                <img src={preference.image} alt="" className="w-10 h-10" />
              </div>
              <div className="w-[85%]">
                <h2 className="font-poppins  text-[#000] text-sm">
                  {preference.name}
                </h2>
                <p className="font-poppins text-xs text-[#004523]">
                  {preference.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="text-[#004523] font-montserrat text-sm font-medium tracking-normal pt-5">
            Lenght of your plan
          </h4>
          <p className="text-[#E9A820] text-sm font-poppins">
            How long do you want the plan to last?
          </p>
          <div className="flex flex-row ">
            {[2, 3, 4, 5].map((length) => (
              <div
                key={length}
                className={`border p-4 justify-center flex w-[100%] items-center gap-3 ${
                  planLength === length ? "border-[#E9A820]" : "border-black"
                } rounded-md mt-5`}
                onClick={() => handlePlanLengthSelect(length)}
              >
                {length}
              </div>
            ))}
          </div>
          <h4 className="text-[#004523] font-montserrat text-sm font-medium tracking-normal pt-5">
            Meals per day
          </h4>
          <p className="text-[#E9A820] text-sm font-poppins">
            How many meals do you want per day?
          </p>
          <div className="flex flex-row ">
            {[1, 2, 3].map((length) => (
              <div
                key={length}
                className={`border p-4 justify-center flex w-[100%] items-center gap-3 ${
                  mealsPerDay === length ? "border-[#E9A820]" : "border-black"
                } rounded-md mt-5`}
                onClick={() => handleMealsPerDaySelect(length)}
              >
                {length}
              </div>
            ))}
          </div>
          <h4 className="text-[#004523] font-montserrat text-sm font-medium tracking-normal pt-5">
            Serving
          </h4>
          <p className="text-[#E9A820] text-sm font-poppins">
            How many people are you cooking for?
          </p>
          <div className="flex flex-row ">
            {[1, 2, 3].map((length) => (
              <div
                key={length}
                className={`border p-4 justify-center flex w-[100%] items-center gap-3 ${
                  servingSize === length ? "border-[#E9A820]" : "border-black"
                } rounded-md mt-5`}
                onClick={() => handleServingSizeSelect(length)}
              >
                {length}
              </div>
            ))}
          </div>
        </div>
        {/* <h2 className="text-2xl font-bold text-center mb-4">
          Meal Plan Calendar
        </h2> */}
        {/* <div className="flex flex-wrap justify-center">{renderWeekDays()}</div> */}
      </div>
    </>
  );
};

export default Plan;
