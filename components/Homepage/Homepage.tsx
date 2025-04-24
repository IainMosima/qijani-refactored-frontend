"use client";
import React, { useState } from "react";
import About from "./About";
import { useAppSelector } from "@/hooks/reduxHook";
import { ProductResults } from "..";
import { arrayShuffler } from "@/utils/arrayShuffler";
import { CategoriesData } from "@/models/product";
import QuizForm from "@/components/Homepage/QuizForm";
import "./Homepage.scss"

interface Props {
  categories: string[];
  sampleProducts: CategoriesData[]
}

const Homepage = (props: Props) => {
  const user = useAppSelector(state => state.login.user);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {user ?
        <ProductResults categories={arrayShuffler(props.categories) as string[]} sampleProducts={props.sampleProducts} /> :
        <>
          <div className="home-bg mt-4">
            <div className="justify-center items-center flex flex-col h-screen">
              <h1 className="font-montserrat text-3xl text-white font-bold tracking-normal">
                Umetry Qijani
              </h1>
              <p className="text-sm text-white font-poppins">
                Embark on a culinary journey together
              </p>
              {showForm ? <QuizForm /> : (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-[#004523] text-[#E9A820] w-[95%] md:w-40 rounded-md font-poppins font-bold py-2 px-4 mt-4"
                >
                  Take quiz
                </button>
              )}

            </div>
          </div>
          {/* <About /> */}
        </>
      }

    </>
  );
};

export default Homepage;
