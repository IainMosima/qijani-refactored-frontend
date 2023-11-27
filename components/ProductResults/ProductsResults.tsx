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
    <div className='lg:w-[92%] w-[100%] px-2 mx-auto overflow-x-hidden'>
      <CategoriesSelector categories={["All", ...categories]} />
      <Categories sampleProducts={sampleProducts} />
    </div>
  );
};

export default ProductsResults;
