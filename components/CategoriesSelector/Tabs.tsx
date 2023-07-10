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

const Tabs = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const selectedcategory = useAppSelector((state) => state.selectedcategory);

  console.log(selectedcategory);
  return (
    <div className="w-full mt-[5rem] flex place-items-center gap-3 sm:ml-0 ml-1">
      {categories.map((category, index) => (

        <div key={index}>
        <button
          className="border-2 border-green rounded-xl px-4 py-2 hover:bg-green hover:border-1 hover:text-yellow hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto"
          onClick={() => dispatch(selectCategory(category))}
        >
          {category}
        </button>
        </div>
      ))}

      {/* <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={12}
        spaceBetween={0}
      >
        <div className="flex justify-center gap-2 w-full">
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <button className="border-2 border-green rounded-xl px-4 py-2 hover:bg-green hover:border-1 hover:text-yellow hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto"
              onClick={()=>(selectCategory(category))}
              >
                {category}
              </button>
            </SwiperSlide>
          ))}
        </div>
      </Swiper> */}
    </div>
  );
};

export default Tabs;
