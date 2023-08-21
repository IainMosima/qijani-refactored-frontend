"use client";
import { useAppSelector } from "@/hooks/reduxHook";
import { useEffect, useRef, useState } from "react";
import { ItemStructure, PackageStructure } from "../../models/package";
import { getPackage } from "../../network/package";
import Loading from "../Loading/Loading";
import CheckOutModal from "./CheckOutModal/CheckOutModal";
import "./Checkout.scss";
import ProductDetails from "./ProductDetails/ProductDetails";

import { Images } from "@/constants";
import { Input, Tooltip } from '@mantine/core';
import Image from "next/image";
import { useForm } from "react-hook-form";

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
  const [countyClassname, setCountyClassname] = useState("county");
  const [areaClassname, setAreaClassname] = useState("area");
  const [areaMessage, setAreaMessage] = useState("");
  const [countyMessage, setCountyMessage] = useState("");
  const [landmarkClassname, setLandmarkClassname] = useState("landmark");
  const [landmarkMessage, setLandmarkMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  function onCountyChange(event: React.ChangeEvent<HTMLInputElement>) {
    const county = event.target.value;

    setTimeout(() => {
      if (county.length < 3) {
        setCountyClassname("input-warning, county");
        setCountyMessage("County must be chosen!!");
      } else {
        setCountyClassname("input-ok, county");
        setCountyMessage("");
      }
    }, 1500);
  }

  function onAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
    const area = event.target.value;

    setTimeout(() => {
      if (area.length < 3) {
        setAreaClassname("input-warning, area");
        setAreaMessage("Area must be at least 3 characters!!");
      } else {
        setAreaClassname("input-ok, area");
        setAreaMessage("");
      }
    }, 1500);
  }

  function onLandmarkChange(event: React.ChangeEvent<HTMLInputElement>) {
    const landmark = event.target.value;

    setTimeout(() => {
      if (landmark.length < 3) {
        setLandmarkClassname("input-warning, landmark");
        setLandmarkMessage("Landmark must be at least 3 characters!!");
      } else {
        setLandmarkClassname("input-ok, landmark");
        setLandmarkMessage("");
      }
    }, 1500);
  }
  
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
          <div className="footer">
            <div className="delivery_details">
              <h5><b>Delivery Info.</b></h5>
              <div className={countyClassname}>
                <div>
                  <h5>County:</h5>
                </div>
                <div>
                  {countyMessage && <small className="text-danger">{countyMessage}</small>}
                  <select className="input select" {...register("county", { onChange: onCountyChange })} required>
                    <option>----</option>
                    <option value="baringo">Baringo</option>
                    <option value="bomet">Bomet</option>
                    <option value="bungoma">Bungoma</option>
                    <option value="busia">Busia</option>
                    <option value="elgeyo marakwet">Elgeyo Marakwet</option>
                    <option value="embu">Embu</option>
                    <option value="garissa">Garissa</option>
                    <option value="homa bay">Homa Bay</option>
                    <option value="isiolo">Isiolo</option>
                    <option value="kajiado">Kajiado</option>
                    <option value="kakamega">Kakamega</option>
                    <option value="kericho">Kericho</option>
                    <option value="kiambu">Kiambu</option>
                    <option value="kilifi">Kilifi</option>
                    <option value="kirinyaga">Kirinyaga</option>
                    <option value="kisii">Kisii</option>
                    <option value="kisumu">Kisumu</option>
                    <option value="kitui">Kitui</option>
                    <option value="kwale">Kwale</option>
                    <option value="laikipia">Laikipia</option>
                    <option value="lamu">Lamu</option>
                    <option value="machakos">Machakos</option>
                    <option value="makueni">Makueni</option>
                    <option value="mandera">Mandera</option>
                    <option value="meru">Meru</option>
                    <option value="migori">Migori</option>
                    <option value="marsabit">Marsabit</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="muranga">Muranga</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="nakuru">Nakuru</option>
                    <option value="nandi">Nandi</option>
                    <option value="narok">Narok</option>
                    <option value="nyamira">Nyamira</option>
                    <option value="nyandarua">Nyandarua</option>
                    <option value="nyeri">Nyeri</option>
                    <option value="samburu">Samburu</option>
                    <option value="siaya">Siaya</option>
                    <option value="taita taveta">Taita Taveta</option>
                    <option value="tana river">Tana River</option>
                    <option value="tharaka nithi">Tharaka Nithi</option>
                    <option value="trans nzoia">Trans Nzoia</option>
                    <option value="turkana">Turkana</option>
                    <option value="uasin gishu">Uasin Gishu</option>
                    <option value="vihiga">Vihiga</option>
                    <option value="wajir">Wajir</option>
                    <option value="pokot">West Pokot</option>
                  </select>
                </div>
              </div>
              <div className={areaClassname}>
                <div>
                  <h5>Area:</h5>
                </div>
                <div>
                  {areaMessage && <small className="text-danger">{areaMessage}</small>}
                  <Input
                    required
                    {...register("area", { onChange: onAreaChange })}
                    placeholder="E.g. Juja, Thika, Kilimani"
                    rightSection={
                      <Tooltip label="Enter the town you're in!" position="top-end" withArrow>
                        <div>
                          <Image className="info" src={Images.info} alt="info-icon" />
                        </div>
                      </Tooltip>
                    }
                  />
                </div>
              </div>
              <div className={landmarkClassname}>
                <div>
                  <h5>Landmark:</h5>
                </div>
                <div>
                  {landmarkMessage && <small className="text-danger">{landmarkMessage}</small>}
                  <Input
                    required
                    {...register("landmark", { onChange: onLandmarkChange })}
                    placeholder="E.g. Building name"
                    rightSection={
                      <Tooltip label="Enter a well known building near you!" position="top-end" withArrow>
                        <div>
                          <Image className="info" src={Images.info} alt="info-icon" />
                        </div>
                      </Tooltip>
                    }
                  />
                </div>
              </div>
            </div>

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
