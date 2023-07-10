"use client";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";
import Tabs from "./Tabs";

const CategoriesSelector = () => {
  return (
    <Provider store={store}>
      <Tabs />
    </Provider>
  );
};

export default CategoriesSelector;
