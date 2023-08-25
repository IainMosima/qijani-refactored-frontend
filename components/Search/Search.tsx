'use client';
import { useEffect, useState } from "react";
import { Images } from "../../constants";
import { Product } from "../../models/product";
import { searchFunction } from "../../network/products";

import { useAppSelector } from "@/hooks/reduxHook";
import { Alert, Snackbar } from "@mui/material";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "../Loading/Loading";
import NoResults from "../NoResults/NoResults";
import AddPackageModal from "../Packages/AddPackageModal/AddPackageModal";
import "./Search.scss";


interface SearchProps {
  query: string
}

const Search = ({ query }: SearchProps) => {
  const [results, setResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [open, setOpen] = useState(true);
  const [price, setPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const loggedInUser = useAppSelector(state => state.login.user)
  const [noResults, setNoResults] = useState(false);
  const [setsuccessfulyAdded, setSetsuccessfulyAdded] = useState(false);

  function handleCloseSetsuccessfulyAdded() {
    setSetsuccessfulyAdded(false);
  }
  const navigate = useRouter();

  useEffect(() => {
    async function fetchCategoryProducts(query: string) {
      const response = await searchFunction(query);
      if (response.length > 0) {
        setResults(response);
      } else {
        setNoResults(true);
        setResults(response);
      }
    }

    fetchCategoryProducts(query);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, navigate]);

  function handleClose() {
    setOpen(false);
  }

  function selectItemManager(product: Product) {
    if (loggedInUser) {
      setSelectedProduct(product);
      setOpen(true);
      setPrice(product.price);
    } else {
      navigate.push('/loginSignup/add');
    }
  }

  return (
    <div className="app__searchResults sm:mt-[8rem] mt-[7rem] mb-[2.5rem]">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={setsuccessfulyAdded}
        onClose={handleCloseSetsuccessfulyAdded}
        autoHideDuration={3000}
      >
        <Alert onClose={handleCloseSetsuccessfulyAdded} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
      {selectedProduct && loggedInUser &&
        <AddPackageModal
          open={open}
          onClose={handleClose}
          loggedInUser={loggedInUser}
          product={selectedProduct}
          price={price}
          setPrice={setPrice}
          setSetsuccessfulyAdded={setSetsuccessfulyAdded}
          setSuccessMessage={setSuccessMessage}
          selectedProduct={selectedProduct}
        />
      }

      {results.length > 0 &&
        <div className='crumbs cursor-pointer'>
          <Breadcrumbs>
            <Link
              underline='hover'
              onClick={()=>navigate.push('/')}
              style={{ color: '#E09132' }}
            >
              Home
            </Link>
            <Typography color="text.primary">{query}</Typography>

          </Breadcrumbs>
        </div>
      }

      {results.length > 0 ?
        (
          <div className="card-body grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {results.map((item, index) => (
              <div
                key={index}
                className="card lg:h-auto md:h-auto h-[18rem]"
                onClick={() => selectItemManager(item)}
              >
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
                  <Image src={Images.addIcon} alt="add" width={25} />
                  <Image src={Images.cartIcon} alt="add" width={25} />
                </div>
              </div>
            ))}
          </div>
        )
        : noResults ?
          (
            <NoResults searchValue={query} backLink={'/'} />
          )
          :
          (
            <div className="mt-[15rem]">
              <Loading />
            </div>
          )}


    </div>
  );
}

export default Search;