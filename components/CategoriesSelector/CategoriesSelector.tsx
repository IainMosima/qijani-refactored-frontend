"use client";
import React from "react";
import "./CategoriesSelector.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const categories = ["All", "Cereals", "Fruits", "Vegetables", "Herbs", "Meat", "All", "Cereals", "Fruits", "Vegetables", "Herbs", "Meat", "All", "Cereals", "Fruits", "Vegetables", "Herbs", "Meat"];

const CategoriesSelector = () => {
  return (
    <div className="w-full mt-[5rem]">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={10}
        spaceBetween={0}
      >
        <div className="flex justify-center gap-2 w-full">
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <button className="border-2 border-green rounded-xl px-4 py-2 hover:bg-green hover:border-1 hover:text-yellow hover:font-extrabold font-semibold ease-in-out duration-100 mx-auto">
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
