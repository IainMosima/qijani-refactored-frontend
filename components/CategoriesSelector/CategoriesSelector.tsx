"use client";
import React, { useEffect } from "react";
import "./CategoriesSelector.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { selectCategory } from "@/redux/reducers/selectedCategoryReducer";

const trial = ['All', 'Vegatables', 'Fruits', 'Herbs', 'Meat', 'Vegatables', 'Fruits', 'Herbs', 'Meat', 'Vegatables', 'Fruits', 'Herbs', 'Meat', 'Vegatables', 'Fruits', 'Herbs', 'Meat']

const CategoriesSelector = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const selectedcategory = useAppSelector(
    (state) => state.selectedcategory.selectedCategory
  );

  return (
    <div className="w-full sm:mt-[4.2rem] mt-[3.7rem] fixed top-0 lg:right-[3rem] md:right-[1rem] right-[1rem] bg-white z-0">
      {/* {categories.map((category, index) => (
        <div key={index}>
          <button
            className={`border-2 border-green rounded-xl px-4 py-2 hover:bg-green hover:border-1 hover:text-yellow hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto ${
              category === selectedcategory
                ? "bg-green font-extrabold text-yellow"
                : ""
            }`}
            onClick={() => dispatch(selectCategory(category))}
          >
            {category}
          </button>
        </div>
      ))} */}

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={15}
        spaceBetween={0}
      >
        <div className="flex justify-center gap-2 w-full">
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <button
                className={`border-2 border-green rounded-xl px-4 py-2 hover:bg-green hover:border-1 hover:text-yellow hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto ${
                  category === selectedcategory
                    ? "bg-green font-extrabold text-yellow"
                    : ""
                }`}
                onClick={() => dispatch(selectCategory(category))}
              >
                {category}
              </button>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default CategoriesSelector;
