/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import Image from "next/image";
import { Images } from "@/constants";
import "./About.scss";

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
        <div className="w-full">
            <div className="py-10 px-5 flex flex-col gap-5 md:flex-row justify-center place-items-center w-full">
                <div className="flex flex-col items-center ">
                    <Image priority={true} src="/restaurant.png" alt="about" width={50} height={50} />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Crafting dishes with love and finesse
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        From timeless classics to quick oven delights – our meals, your
                        satisfaction!
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Image width={50} height={50} priority={true} src="/knife.png" alt="about" />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Precision, pre-portioned, fresh.
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        Experience the ease of cooking with precision. Fresh, pre-portioned
                        ingredients, exclusively for you.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Image priority={true} width={50} height={50} src="/manual.png" alt="about" />
                    <h3 className="text-[#004523] mt-2 font-montserrat text-sm">
                        Personalized Culinary Bliss
                    </h3>
                    <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                        A gourmet like experience with a customizable meal kit, tailored
                        exclusively for your tastebuds.
                    </p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center gap-2 px-5 relative">
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
                <Swiper className="w-full flex justify-center items-center swiper-container absolute left-[-15px] sm:top-[110%] top-[125%]" spaceBetween={null}>
                    <SwiperSlide className="flex justify-center items-center h-full w-full">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-5 m-5 w-[25rem] aspect-square h-[25rem] flex flex-col relative custom-shadow"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                <Image src={Images.closeModal} alt="close-modal" priority={true} width={25} />
                            </button>
                            <div className="relative flex mt-10 flex-col items-center">
                                <Image priority={true}
                                    src="/heart.png"
                                    alt="heart"
                                    width={50}
                                    height={50}
                                    className="h-32 w-32 absolute"
                                />
                                <Image priority={true}
                                    src="/person.png"
                                    alt="person"
                                    width={50}
                                    height={50}
                                    className="h-28 w-28 z-10"
                                />
                                <div className="bg-[#004523] mt-10 text-[#E9A820] rounded-lg aspect-square px-3 py-1 flex place-items-center">
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
                            className="bg-white p-5 m-5 w-[25rem] aspect-square h-[25rem] flex flex-col relative custom-shadow"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                <Image src={Images.closeModal} alt="close-modal" priority={true} width={25} />
                            </button>
                            <div className=" flex mt-5 flex-col items-center">
                                <div className="bg-[#004523] mt-10 text-[#E9A820] rounded-lg aspect-square px-3 py-1 flex place-items-center">
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
                                    <Image src="/love.png" alt="heart" className="h-32 w-32 " width={50} height={50} />
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
                            className="bg-white p-5 m-5 w-[25rem] aspect-square h-[25rem] flex flex-col relative custom-shadow"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                <Image src={Images.closeModal} alt="close-modal" priority={true} width={25} />
                            </button>
                            <div className="flex mt-5 flex-col items-center">
                                <div className="mt-5">
                                    <Image priority={true}
                                        src="/delivery.png"
                                        alt="delivery"
                                        width={50}
                                        height={50}
                                        className="h-32 w-32 "
                                    />
                                </div>
                                <div className="bg-[#004523] mt-10 text-[#E9A820] rounded-lg aspect-square px-3 py-1 flex place-items-center">
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
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-5 m-5 w-[25rem] aspect-square h-[25rem] flex flex-col relative custom-shadow"
                        >
                            <button
                                onClick={closeModal}
                                className="absolute top-0 right-0 m-5 font-bold"
                            >
                                <Image src={Images.closeModal} alt="close-modal" priority={true} width={25} />
                            </button>
                            <div className=" flex mt-5 flex-col items-center">
                                <div className="bg-[#004523] mt-10 text-[#E9A820] rounded-lg aspect-square px-3 py-1 flex place-items-center">
                                    <h2 className="text-lg font-poppins font-bold">4</h2>
                                </div>
                                <h2 className="text-sm font-bold text-[#004523] mt-5  font-montserrat">
                                Be a MasterChef
                                </h2>
                                <p className="text-xs font-poppins text-center text-[#004523] tracking-wide mt-1">
                                Cooking incredible meals becomes a breeze! Follow our easy step-by-step guides, crafted by our kitchen experts, and become a culinary wizard in no time.
                                </p>
                                <div className="mt-5">
                                    <Image src="/cooking.png" alt="heart" className="h-32 w-32 " width={50} height={50} />
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
