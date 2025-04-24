"use client";
import React, { useState } from 'react'
import QuizForm from '../Homepage/QuizForm';

function QuizWrapper() {
  const [showForm, setShowForm] = useState(false);

  return (
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
  )
}

export default QuizWrapper