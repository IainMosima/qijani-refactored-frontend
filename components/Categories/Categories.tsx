"use client";
import Category from "./Category/Category";
import { fetchCategory } from "../../network/products";
import { SetStateAction, useEffect, useState } from "react";
import { Product } from "../../models/product";
import "./Categories.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "../../models/user";
import AddPackageModal from "../Packages/AddPackageModal/AddPackageModal";
import { PackageStructure } from "../../models/package";
import { useAppSelector } from "@/hooks/reduxHook";
import Loading from "../Loading/Loading";
import Image from "next/image";
import { Images } from "@/constants";
interface CategoriesData {
  categoryName: string;
  products: Product[];
}

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState<CategoriesData[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(true);
  const [price, setPrice] = useState(0);

  const categories = useAppSelector((state) => state.categories);
  const selectedCategory = useAppSelector(
    (state) => state.selectedcategory.selectedCategory
  );
  const loggedInUser = useAppSelector((state) => state.login.user);
  const myPackages = useAppSelector((state) => state.packages);

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    async function fetchResults(records = 7) {
      const result: SetStateAction<CategoriesData[] | undefined> = [];
      let products;

      if (categories) {
        setCategoriesData([]);
        setFilteredResults([]);
        if (selectedCategory === "All") {
          for (const category of categories.categories) {
            if (category !== "All") {
              products = await fetchCategory(category, records);
              result.push({
                categoryName: category,
                products: products,
              });
            }
          }
        } else {
          setFilteredResults([]);
          setCategoriesData([]);
          products = await fetchCategory(selectedCategory);
          setFilteredResults(products);
        }
      }

      setCategoriesData(result);
    }

    fetchResults();
  }, [categories, selectedCategory]);

  return (
    <div className="app__category sm:mt-[8.5rem] mt-[7.5rem]">
      {selectedCategory === "All" ? (
        categoriesData.length > 1 ? (
          <>
            {categoriesData?.map((item, index) => (
              <div key={index} className="mb-[2rem]">
                <Category
                  categoryName={item.categoryName}
                  query={item.categoryName}
                  products={item.products}
                  loggedInUser={loggedInUser}
                  setSelectedProduct={setSelectedProduct}
                  setOpen={setOpen}
                  setPrice={setPrice}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="mt-[25rem]">
            <Loading />
          </div>
        )
      ) : filteredResults.length > 0 ? (
        <div className="card-body grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {filteredResults.map((item, index) => (
            <div key={index} className="card">
             <Image
              className="product-img"
              src={`${process.env.NEXT_PUBLIC_PRODUCTSBUCKET}/${item.productImgKey}`}
              alt={item.productName}
              width={400}
              height={400}
            />
              <p className="name sm:text-[1.2rem] text-[1.1rem] ">
                {item.productName}
              </p>
              <p className="price sm:text-[1.4rem] text-[1.3rem] font-bold">
                Ksh. {item.price}
              </p>
              <p className="quantity sm:text-[0.9rem] text-[0.8rem] font-thin italic">
                per kg
              </p>
              <div className="add">
                <Image src={Images.addIcon} alt="add" />
                <Image src={Images.cartIcon} alt="add" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-[25rem]">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Categories;
