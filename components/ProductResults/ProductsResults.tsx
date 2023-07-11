import React from "react";
import Categories from "../Categories/Categories";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";

const ProductsResults = () => {
  return (
    <div>
      <CategoriesSelector />
      <Categories />
    </div>
  );
};

export default ProductsResults;
