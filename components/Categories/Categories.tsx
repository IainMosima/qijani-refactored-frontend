import Category from "./Category/Category";
import { fetchCategory } from "../../network/products";
import { SetStateAction, useEffect, useState } from "react";
import { Product } from "../../models/product";
import "./Categories.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { User } from "../../models/user";
import AddPackageModal from "../Packages/AddPackageModal/AddPackageModal";
import { PackageStructure } from "../../models/package";


interface  CategoriesProps {
    categories: string[] | undefined
    setMenuToogle: React.Dispatch<React.SetStateAction<boolean>>,
    loggedInUser: User | null,
    myPackages: PackageStructure[],
    setMyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>,
}

interface CategoriesData {
    categoryName: string,
    products: Product[],
}

const Categories = ({ categories, setMenuToogle, loggedInUser, myPackages, setMyPackages }: CategoriesProps) => {
    const [categoriesData, setCategoriesData] = useState<CategoriesData[]>();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const [loader, setLoader] = useState(true);
    const [open, setOpen] = useState(true);
    const [price, setPrice] = useState(0);
    function handleClose () {
        setOpen(false);
    }
    


    useEffect(() => {
        async function getAllCategoryProducts(records = 6) {
            const result: SetStateAction<CategoriesData[] | undefined> = [];
            let products;

            if (categories) {
                for (const category of categories) {
                    products = await fetchCategory(category, records);
                    result.push({
                        categoryName: category,
                        products: products
                    });
                }
            }


            
            setCategoriesData(result);
        }

        getAllCategoryProducts();

        const timeOutId = setTimeout(() => {
            setLoader(false);
        }, 3700);

        return () => clearTimeout(timeOutId);

    }, [categories]);
    
    
    return (
        <div className='app__category' onClick={()=>setMenuToogle(false)}>
            {/* {loader &&
                <div className="spinner">
                    <CircularProgress size="4rem" color="inherit"/>
                </div>
            } */}
            {selectedProduct && loggedInUser &&
                <AddPackageModal open={open} onClose={handleClose} loggedInUser={loggedInUser} product={selectedProduct} price={price} setPrice={setPrice} myPackages={myPackages} setmyPackages={setMyPackages}/>
            }

            {categoriesData?.map((item, index) => (
                <div key={index}>
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
            ))
            }        
        </div>
    );
}
 
export default Categories;