import React from "react";
import Categories from "../Categories/Categories";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import { CategoriesData } from "@/models/product";

interface ProductsResultsProps {
  categories: string[];
  sampleProducts: CategoriesData[];
}

const ProductsResults = ({
  categories,
  sampleProducts,
}: ProductsResultsProps) => {
  return (
    <div>
      <CategoriesSelector categories={["All", ...categories]} />
      <Categories sampleProducts={sampleProducts} />
    </div>
  );
};

export default ProductsResults;
