import React from "react";
import Categories from "../Categories/Categories";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from "next";
import { fetchCategories, fetchCategory } from "@/network/products";
import { CategoriesData } from "@/models/product";


interface ProductsResultsProps {
  categories: string[],
  sampleProducts: CategoriesData[]
}

const ProductsResults = ({ categories, sampleProducts }: ProductsResultsProps) => {
  
  
  return (
    <div>
      <CategoriesSelector categories={['All',...categories]}/>
      <Categories categories={categories} sampleProducts={sampleProducts}/>
    </div>
  );
};

export default ProductsResults;

