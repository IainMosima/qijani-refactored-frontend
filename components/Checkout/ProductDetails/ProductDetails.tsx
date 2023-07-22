import { useEffect, useRef, useState } from "react";
import { ItemStructure, PackageStructure } from "../../../models/package";
import { Product } from "../../../models/product";
import { getProduct } from "../../../network/products";
import { itemManager } from "../../../utils/itemManager";
import "./ProductDetails.scss";
import { Images } from "../../../constants";
import { removeItem } from "../../../utils/itemManager";
import { updatePackage } from "../../../network/package";
import Image from "next/image";


interface ProductDetailsProps {
  productId: string,
  price: number,
  total: number
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  packageInfo: PackageStructure,
  setPackageInfo: React.Dispatch<React.SetStateAction<PackageStructure >>,
  items: ItemStructure[],
  setItems: React.Dispatch<React.SetStateAction<ItemStructure[] | undefined>>,
  reload: boolean,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}




const ProductDetails = ({productId, price, total, setTotal, packageInfo, setPackageInfo, items, setItems, reload, setReload} : ProductDetailsProps) => {
  const [productInfo, setProductInfo] = useState<Product>();
  const quantityInput = useRef<HTMLInputElement>(null);
  const [calculatedPrice, setCalculatedPrice] = useState(price);

    useEffect(() => {
      async function fetchProduct(productId: string) {
        try {
            const response = await getProduct(productId);
            if(quantityInput.current) quantityInput.current.value = (price/ response.price).toFixed(1);
            setProductInfo(response);
        } catch (err) {
            console.error(err);
        }
      }

      fetchProduct(productId);
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    function priceCalc() {
      if(quantityInput.current?.value && productInfo){
        const value = parseFloat(quantityInput.current.value);
        const updatedTruePrice = value * productInfo.price || 1;
        const updatedTotal = (total  - calculatedPrice) + updatedTruePrice;

        setTotal(updatedTotal);
        setCalculatedPrice(updatedTruePrice);

        let updatedItems = packageInfo.items;

        if(updatedItems) updatedItems = itemManager(updatedItems, productId, updatedTruePrice);

        setPackageInfo(prevState => ({
          ...prevState,
          items: updatedItems
        }));

      }
    }

    function quantityDecrement (event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      if(quantityInput.current?.value && parseFloat(quantityInput.current?.value) > 0) {
          quantityInput.current.value = (parseFloat(quantityInput.current.value) - 0.5).toFixed(1);
          priceCalc();
      } 
    }
     

    function quantityIncrement (event: React.MouseEvent<HTMLButtonElement>) {
      event.preventDefault();
      if(quantityInput.current?.value && parseFloat(quantityInput.current?.value) < 100) {
          quantityInput.current.value = (parseFloat(quantityInput.current.value) + 0.5).toFixed(1);
          priceCalc();
      }
    }

    function quantityChange() {
      priceCalc();
      
    }

    async function deleteItem(productId: string) {
      let updatedItems = items;
      if (updatedItems) updatedItems = removeItem(updatedItems, productId);
    
      const totalPrice = updatedItems.reduce((total, item) => {
          if (item.price) {
              return total + item.price;
          }
          return 0;
      }, 0) || 0;
      
      setTotal(totalPrice);
      setItems(updatedItems);
      
      try {
          const response = await updatePackage({userId: packageInfo.userId, packageId: packageInfo._id, packageName: packageInfo.packageName, items: updatedItems|| []});
          if (response) {
            setPackageInfo(response.data);
          }

      } catch (err) {
        console.error(err);
      }
      
      
  }

    return ( 
        <div className="app__prodcutDetails">
            {productInfo &&
              <div className="table-body">
                <div className="product-name">
                  <Image src={`${process.env.NEXT_PUBLIC_PRODUCTSBUCKET}/${productInfo.productImgKey}`} alt={productInfo.productName} width={40} height={40}/>
                  <p >{productInfo.productName}</p>
                </div>

                <div className="default-price">
                  <p>Ksh {productInfo.price}</p>
                </div>

                <div className="amount">
                  <button className="decrement" onClick={quantityDecrement}>-</button>

                  <input type='number' ref={quantityInput} min='0' defaultValue="1" max='100' step='0.1' onChange={quantityChange}/>

                  <button className="increment" onClick={quantityIncrement}>+</button>
              </div>

              <div className="price">
                <p>Ksh {calculatedPrice}</p>
              </div>

              <div className="delete" onClick={() => deleteItem(productId)}>
                <Image src={Images.trashIcon} alt="delete-icon"/>
              </div>

            </div>
            }
              
        </div>
     );
}

 
export default ProductDetails;