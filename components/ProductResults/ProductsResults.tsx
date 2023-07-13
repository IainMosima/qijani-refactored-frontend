import React from "react";
import Categories from "../Categories/Categories";
import CategoriesSelector from "../CategoriesSelector/CategoriesSelector";
import { GetServerSideProps, GetStaticProps, InferGetServerSidePropsType } from "next";
import { fetchCategories, fetchCategory } from "@/network/products";
import { CategoriesData } from "@/models/product";



const ProductsResults = async () => {
  const categories = await fetchCategories();
  const sampleProducts = await getAllProductResults(categories);
  
  return (
    <div>
      <CategoriesSelector categories={['All',...categories]}/>
      <Categories categories={categories} sampleProducts={sampleProducts}/>
    </div>
  );
};

export default ProductsResults;


async function getAllProductResults(categories: string[], records = 6): Promise<CategoriesData[]> {
  const result: CategoriesData[] = [];
  for (const category of categories) {
    if (category !== "All") {
      const products = await fetchCategory(category, records);
      result.push({
        categoryName: category,
        products: products,
      });
    }
  }
  return result;
}


