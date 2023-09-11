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
import transportMoney from "@/utils/transportMoney";

interface ProductDetailsProps {
  productId: string;
  price: number;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  packageInfo: PackageStructure;
  setPackageInfo: React.Dispatch<React.SetStateAction<PackageStructure>>;
  items: ItemStructure[];
  setItems: React.Dispatch<React.SetStateAction<ItemStructure[] | undefined>>;
}

const token = localStorage.getItem('token');
const ProductDetails = ({
  productId,
  price,
  total,
  setTotal,
  packageInfo,
  setPackageInfo,
  items,
  setItems,
}: ProductDetailsProps) => {
  const [productInfo, setProductInfo] = useState<Product>();
  const quantityInput = useRef<HTMLInputElement>(null);
  const [calculatedPrice, setCalculatedPrice] = useState(price);

  useEffect(() => {
    async function fetchProduct(productId: string) {
      try {
        const response = await getProduct(productId);
        if (quantityInput.current)
          quantityInput.current.value = (price / response.price).toFixed(1);
        setProductInfo(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProduct(productId);


  }, [price, productId]);

  function priceCalc() {
    if (quantityInput.current?.value && productInfo) {
      const value = parseFloat(quantityInput.current.value);
      const updatedTruePrice = value * productInfo.price || 1;
      let updatedTotal = total - calculatedPrice + updatedTruePrice;
      updatedTotal = updatedTotal + transportMoney(updatedTotal);

      setTotal(updatedTotal);
      setCalculatedPrice(updatedTruePrice);

      let updatedItems = packageInfo.items;

      if (updatedItems)
        updatedItems = itemManager(updatedItems, productId, updatedTruePrice);

      setPackageInfo((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  }

  function quantityDecrement(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const unit = productInfo?.unit.split(",")[0];
    const decrement = productInfo?.unit.split(",")[1];
    if (decrement)
      if (
        quantityInput.current?.value &&
        parseFloat(quantityInput.current?.value) > 0
      ) {
        if (unit === 'kg') {
          if (Number(decrement) === 1) {
            quantityInput.current.value = (
              parseFloat(quantityInput.current.value) - parseFloat(decrement) / 2
            ).toFixed(1);
          } else {
            quantityInput.current.value = (
              parseInt(quantityInput.current.value) - 1
            ).toFixed(1);
          }
        } else {
          quantityInput.current.value = (
            parseInt(quantityInput.current.value) - parseInt(decrement)
          ).toFixed(1);
        }
        priceCalc();
      }
  }

  function quantityIncrement(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const unit = productInfo?.unit.split(",")[0];
    const decrement = productInfo?.unit.split(",")[1];
    if (decrement)
      if (
        quantityInput.current?.value &&
        parseFloat(quantityInput.current?.value) > 0
      ) {
        if (unit === 'kg') {
          if (Number(decrement) === 1) {
            quantityInput.current.value = (
              parseFloat(quantityInput.current.value) + parseFloat(decrement) / 2
            ).toFixed(1);
          } else {
            quantityInput.current.value = (
              parseInt(quantityInput.current.value) + 1
            ).toFixed(1);
          }
        } else {
          quantityInput.current.value = (
            parseInt(quantityInput.current.value) + parseInt(decrement)
          ).toFixed(1);
        }
        priceCalc();
      }
  }

  function quantityChange() {
    priceCalc();
  }

  async function deleteItem(productId: string) {
    let updatedItems = items;
    if (updatedItems) updatedItems = removeItem(updatedItems, productId);
    let response;

    const totalPrice =
      updatedItems.reduce((total, item) => {
        if (item.price) {
          return total + item.price;
        }
        return 0;
      }, 0) || 0;

    setTotal(totalPrice);
    setItems(updatedItems);

    try {
      if (token)
        response = await updatePackage({
          userId: packageInfo.userId,
          packageId: packageInfo._id,
          packageName: packageInfo.packageName,
          items: updatedItems || [],
        }, token);
      if (response) {
        setPackageInfo(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="app__prodcutDetails">
      {productInfo && (
        <div className="table-body">
          <div className="product-name">
            <Image
              src={`${process.env.NEXT_PUBLIC_PRODUCTSBUCKET}/${productInfo.productImgKey}`}
              alt={productInfo.productName}
              width={45}
              height={45}
            />
            <p className="sm:text-[1.3rem] text-[13px] ">{productInfo.productName}</p>
          </div>

          <div className="default-price sm:w-auto w-[1rem]">
            <p>Ksh {productInfo.price}</p>
          </div>

          <div className="amount flex place-items-center gap-1 flex-col sm:flex-row">
            <div className="flex place-items-center">
              <button
                className="border border-black w-[1.5rem] flex place-items-center justify-center h-[1.5rem] decrement"
                onClick={quantityDecrement}
              >
                <Image src={Images.minusIcon} alt="minus icon" width={15} />
              </button>

              <input
                type="number"
                ref={quantityInput}
                min="0"
                defaultValue={(calculatedPrice / productInfo.price).toFixed(1)}
                max="100"
                step="0.1"
                onChange={quantityChange}
                className=""
              />

              <button
                className="border border-black w-[1.5rem] flex place-items-center justify-center h-[1.5rem] increment"
                onClick={quantityIncrement}
              >
                <Image src={Images.plusIcon} alt="plus icon" width={15} />
              </button>
            </div>

            <label className="italic">{`${productInfo.unit.split(', ')[1] == '2' ? 'piece' : productInfo.unit.split(', ')[0]}(s)`}</label>

          </div>

          <div className="price">
            <p className="sm:w-auto w-[1.2rem]">Ksh {calculatedPrice}</p>
          </div>

          <Image src={Images.trashIcon} alt="delete-icon" className="cursor-pointer" width={22} onClick={() => deleteItem(productInfo._id)} />
        </div>
      )}
    </section>
  );
};

export default ProductDetails;