"use client";
import React, { useState } from "react";
import About from "./About";
import { useAppSelector } from "@/hooks/reduxHook";
import { ProductResults } from "..";
import { arrayShuffler } from "@/utils/arrayShuffler";
import { CategoriesData } from "@/models/product";
import QuizForm from "@/components/Homepage/QuizForm";
import "./Homepage.scss"
import QuizWrapper from "../QuizWrapper/QuizWrapper";

interface Props {
  categories: string[];
  sampleProducts: CategoriesData[]
}

const Homepage = (props: Props) => {
  const user = useAppSelector(state => state.login.user);
  return (
        <ProductResults categories={arrayShuffler(props.categories) as string[]} sampleProducts={props.sampleProducts} />
  );
};

export default Homepage;
