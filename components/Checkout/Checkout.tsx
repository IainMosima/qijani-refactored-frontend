"use client";
import { useAppSelector } from "@/hooks/reduxHook";
import { useEffect, useRef, useState } from "react";
import { ItemStructure, PackageStructure } from "../../models/package";
import { getPackage } from "../../network/package";
import CheckOutModal from "./CheckOutModal/CheckOutModal";
import "./Checkout.scss";
import ProductDetails from "./ProductDetails/ProductDetails";
import Loading from "../Loading/Loading";

interface CheckoutProps {
  packageId: string | null;
}
const Checkout = ({ packageId }: CheckoutProps) => {
  const loggedInUser = useAppSelector((state) => state.login.user);
  const [packageInfo, setPackageInfo] = useState<PackageStructure>({
    _id: "",
    userId: "",
    packageName: "",
    items: [],
  });
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<ItemStructure[]>();
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const packageName = useRef("");

  function onClose() {
    setOpen(false);
  }

  useEffect(() => {
    async function fetchPackageInfo(packageId: string) {
      const response = await getPackage(packageId);

      if (response && response.items) {
        setPackageInfo(response);
        setItems(response.items);
        packageName.current = response.packageName;
        const totalPrice =
          response.items?.reduce((total, item) => {
            if (item.price) {
              return total + item.price;
            }
            return 0;
          }, 0) || 0;

        setTotal(totalPrice);
      } else {
        console.error("You cannont checkout this package!!");
      }
    }
    if (packageId) fetchPackageInfo(packageId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return (
    <div className="app__checkout">
      {loggedInUser && packageId && (
        <CheckOutModal
          loggedInUser={loggedInUser}
          price={total.toString()}
          packageId={packageId}
          open={open}
          onClose={onClose}
        />
      )}
      {packageInfo.items && packageInfo.items?.length > 0 ? (
        <div>
          <h2 className="package-name font-bold text-xl">
            Checking out: {packageName.current} ({items?.length} items)
          </h2>
          <div className="underline"></div>

          <div className="table-head">
            <h3>Item</h3>
            <h3>Price</h3>
            <h3>Quantity (Kg)</h3>
            <h3>Total</h3>
          </div>

          <div className="frame">
            {items?.map((p) => (
              <div key={p.productId}>
                <ProductDetails
                  productId={p.productId}
                  price={p.price}
                  total={total}
                  setTotal={setTotal}
                  packageInfo={packageInfo}
                  setPackageInfo={setPackageInfo}
                  items={items}
                  setItems={setItems}
                  reload={reload}
                  setReload={setReload}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[50vh] flex justify-center  place-items-center">
        <Loading />
        </div>
      )}
      {packageInfo.items && packageInfo.items?.length > 0 && (
        <>
          <div className="footer-price">
            <div className="price-card">
              <h3>Subtotal</h3>
              <h3 className="price">Ksh {total * 0.8}</h3>

              <h3>VAT</h3>
              <h3 className="price">Ksh {total * 0.2}</h3>

              <h3>Grand Total</h3>
              <h3 className="price grand-total">Ksh {total}</h3>
            </div>
          </div>

          <div className="footer-checkout">
            <button onClick={() => setOpen(true)}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
