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

interface CategoriesSelectorProps {
  categories: string[]
}

const CategoriesSelector = ({ categories }:CategoriesSelectorProps) => {
  const dispatch = useAppDispatch();
  // const categories = useAppSelector((state) => state.categories);
  const selectedcategory = useAppSelector(
    (state) => state.selectedcategory.selectedCategory
  );

  return (
    <div className="w-full sm:pt-[4.2rem] pt-[3.7rem] fixed top-0 lg:right-[-.2rem] md:right-[1rem] right-[-.3rem] z-0 bg-white">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        breakpoints={{
          375: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 5,
          },
          1020: {
            slidesPerView: 9,
          },
        }}
        spaceBetween={80}
        >
        <div className="flex justify-center gap-2 w-full">
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <button
                className={`mt-3 mb-3 border-2 border-green rounded-[11px] px-3 py-[0.25rem] lg:hover:bg-green lg:hover:border-1 lg:hover:text-yellow lg:hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto ${
                  category === selectedcategory
                    ? "bg-green font-extrabold text-yellow"
                    : "bg-white"
                }`}
                onClick={() => {dispatch(selectCategory(category)); window.scrollTo(0, 0);}}
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
