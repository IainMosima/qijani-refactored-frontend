import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import { Images } from "../../constants";
import { imageStreamer, searchFunction } from "../../network/products";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
import Link from '@mui/material/Link';
import "./SeeAll.scss";
import AddPackageModal from "../Packages/AddPackageModal/AddPackageModal";
import { User } from "../../models/user";
import { PackageStructure } from "../../models/package";

interface SeeAllProps {
  loggedInUser: User | null,
  myPackages: PackageStructure[],
  setMyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>,
}

const SeeAll = ({ loggedInUser, myPackages, setMyPackages: setmyPackages } : SeeAllProps) => {
    const [results, setResults] = useState<Product[]>();
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
    const [open, setOpen] = useState(true);
    const [price, setPrice] = useState(0);

    const { query } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
      async function fetchCategoryProducts(query: string) {
        const response = await searchFunction(query);
        if (response.length > 0) {
          setResults(response);
        } else {
          navigate(`/noResults/${query}`);
        }
      }

      if (query) {
        fetchCategoryProducts(query);
      }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, navigate]);

    function handleClose () {
      setOpen(false);
    }
    
    function selectItemManager(product: Product) {
      if (loggedInUser) {
          setSelectedProduct(product);
          setOpen(true);
          setPrice(product.price);
      } else {
          navigate('/loginSignup/add');
      }
    }

    return ( 
        <div className="app__searchResults">
          {selectedProduct && loggedInUser &&
                <AddPackageModal open={open} onClose={handleClose} loggedInUser={loggedInUser} product={selectedProduct} price={price} setPrice={setPrice} myPackages={myPackages} setmyPackages={setmyPackages}/>
          }

          <div className='crumbs'>
            <Breadcrumbs>
              <Link
              underline='hover'
              href='/'
              style={{color: '#E09132'}}
              >
                Home
              </Link>
              <Typography color="text.primary">{query}</Typography>

            </Breadcrumbs>
          </div>

          {!results &&
                  <div className="spinner">
                      <CircularProgress size="4rem" color="inherit"/>
                  </div>
          }
          {results &&
              <div className="app__card">
                {results?.map((item, index) => (
                  <div key={index} className="card" onClick={() => selectItemManager(item)}>
                      <img className='product-img' src={imageStreamer(item.productImgKey)} alt={item.productName}/>
                      <p className='name'>{item.productName}</p>
                      <p className='price'>Ksh. {item.price}</p>
                      <p className='quantity'>per kg</p>
                      <div className='add'>
                        <img src={Images.addIcon}  alt='add'/>
                        <img src={Images.cartIcon}  alt='add'/>
                      </div>
                  </div>
                ))
                }
            </div>
          }  
          
        </div>
     );
}
 
export default SeeAll;