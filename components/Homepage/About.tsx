/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";

interface Meal {
    id: number;
    name: string;
    image: string;
}

const About: React.FC = () => {
    const [meals, setMeals] = useState<Meal[]>([
        {
            id: 1,
            name: "Meal Kits",
            image: "./foods.png",
        },
        {
            id: 2,
            name: "Prime Cuts",
            image: "./meat.png",
        },
        {
            id: 3,
            name: "Wines",
            image: "./drink.png",
        },
    ]);

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const swipe = () => {
        const swiperElement = document.querySelector(".swiper-container");
        if (swiperElement) {
            const swiper = (swiperElement as any).swiper;
            swiper.slideNext();
        }
    };

    const swipeBack = () => {
        const swiperElement = document.querySelector(".swiper-container");
        if (swiperElement) {
            const swiper = (swiperElement as any).swiper;
            swiper.slidePrev();
        }
    };

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal();
            }
        };

        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <div className="mx-5 w-full">
            <div className="py-10 flex flex-col gap-5 md:flex-row mx-5 justify-center">
                <div className="flex flex-col items-center">
                    <img src="./restaurant.png" alt="about" />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Crafting dishes with love and finesse
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        From timeless classics to quick oven delights – our meals, your
                        satisfaction!
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="./knife.png" alt="about" />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Precision, pre-portioned, fresh.
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        Experience the ease of cooking with precision. Fresh, pre-portioned
                        ingredients, exclusively for you.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <img src="./manual.png" alt="about" />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Personalized Culinary Bliss
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        A gourmet like experience with a customizable meal kit, tailored
                        exclusively for your tastebuds.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center gap-2">
                <button className="text-[#004523] bg-[#E9A820]  font-poppins rounded-md  font-bold py-2 px-4 mt-4" onClick={openModal}>
                    How it works
                </button>
                <button
                    className="bg-[#004523] text-[#E9A820]  font-poppins rounded-md font-bold py-2 px-4 mt-4"
                >
                    Plan your first week
                </button>
            </div>

            {isModalOpen && (
                <Swiper className="bg-black bg-opacity-50 flex justify-center items-center swiper-container" spaceBetween={null}>
                    <SwiperSlide className="flex justify-center items-center h-full w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-5 m-5 rounded-lg w-full h-[60vh] flex flex-col  relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                X
                            </button>
                            <div className="relative flex mt-10 flex-col items-center">
                                <img
                                    src="./heart.png"
                                    alt="heart"
                                    className="h-32 w-32 absolute"
                                />
                                <img
                                    src="./person.png"
                                    alt="person"
                                    className="h-28 w-28 z-10"
                                />
                                <div className="bg-[#004523] mt-10 text-[#E9A820] rounded-lg h-10 w-10 flex justify-center items-center">
                                    <h2 className="text-lg font-poppins font-bold">1</h2>
                                </div>
                                <h2 className="text-sm font-bold text-[#004523] mt-5  font-montserrat">
                                    A Personalized Plan
                                </h2>
                                <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                                    Answer some quick questions so our clever system, Kinda, can
                                    understand what you like. Kinda then creates a plan just for
                                    you.
                                </p>
                            </div>
                            <div className="flex justify-end mt-5">
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipe}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center h-full w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-5 m-5 rounded-lg w-full h-[60vh] flex flex-col  relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                X
                            </button>
                            <div className=" flex mt-5 flex-col items-center">
                                <div className="text-[#004523] bg-[#E9A820] rounded-lg h-10 w-10 flex justify-center items-center">
                                    <h2 className="text-lg font-poppins font-bold">2</h2>
                                </div>
                                <h2 className="text-sm font-bold text-[#004523] mt-5  font-montserrat">
                                    You choose
                                </h2>
                                <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                                    If Kinda's suggestions aren't perfect, no worries! You can
                                    tweak and adjust the plan according to your tastes. At Qijani,
                                    we think your preferences should always come first!
                                </p>
                                <div className="mt-5">
                                    <img src="./love.png" alt="heart" className="h-32 w-32 " />
                                </div>
                            </div>
                            <div className="flex justify-between mt-5">
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipeBack}
                                >
                                    previous
                                </button>
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipe}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center h-full w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-5 m-5 rounded-lg w-full h-[60vh] flex flex-col  relative"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                X
                            </button>
                            <div className="flex mt-5 flex-col items-center">
                                <div className="mt-5">
                                    <img
                                        src="./delivery.png"
                                        alt="delivery"
                                        className="h-32 w-32 "
                                    />
                                </div>
                                <div className="bg-[#004523] mt-5 text-[#E9A820] rounded-lg h-10 w-10 flex justify-center items-center">
                                    <h2 className="text-lg font-poppins font-bold">3</h2>
                                </div>
                                <h2 className="text-sm font-bold text-[#004523] mt-5  font-montserrat">
                                    We Deliver
                                </h2>
                                <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                                    We deliver your meal kits, perfectly portioned and ready to
                                    cook, straight to your doorstep. They come in a special
                                    insulated box that keeps everything fresh and tasty.
                                </p>
                            </div>
                            <div className="flex justify-between mt-3">
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipeBack}
                                >
                                    previous
                                </button>
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipe}
                                >
                                    Next
                                </button>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                    <SwiperSlide className="flex justify-center items-center h-full w-full">
                        <div className="bg-white p-5 m-5 rounded-lg w-full h-[70vh] flex flex-col  relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                X
                            </button>
                            <div className=" flex mt-5 flex-col items-center">
                                <div className="text-[#004523] bg-[#E9A820] rounded-lg h-10 w-10 flex justify-center items-center">
                                    <h2 className="text-lg font-poppins font-bold">4</h2>
                                </div>
                                <h2 className="text-sm font-bold text-[#004523] mt-5  font-montserrat">
                                    Be a MasterChef
                                </h2>
                                <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                                    Cooking incredible meals becomes a breeze! Follow our easy
                                    step-by-step guides, crafted by our kitchen experts, and
                                    become a culinary wizard in no time.
                                </p>
                                <div className="mt-5">
                                    <img src="./cooking.png" alt="heart" className="h-32 w-32 " />
                                </div>
                                <button className="bg-[#004523] text-[#E9A820]  font-poppins rounded-md font-bold py-2 px-4 mt-4">
                                    Get plan
                                </button>
                            </div>
                            <div className="flex justify-between mt-5">
                                <button
                                    className=" text-[#E9A820]  font-poppins rounded-md font-bold"
                                    onClick={swipeBack}
                                >
                                    previous
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            )}

            <div className="bg-[#E9A820] w-full h-[2px] mt-10 "></div>
            <div className="mt-5">
                <h2 className="capitalize font-poppins text-sm font-semibold tracking-wide text-center">
                    See What We’ve Got
                </h2>
                <div className="flex mt-5 flex-col gap-4">
                    {/* background: rgba(0, 0, 0, 0.60); */}
                    {meals.map((meal) => (
                        <div
                            key={meal.id}
                            style={{
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${meal.image})`,
                            }}
                            className="h-[70vh] bg-no-repeat bg-cover bg-center flex justify-center items-center"
                        >
                            <button className="text-white font-bold py-2 px-4 rounded border-2 border-white">
                                {meal.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
