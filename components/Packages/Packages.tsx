"use client";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Images } from "../../constants";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMypackages } from "@/redux/reducers/packagesReducer";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deletePackage } from "../../network/package";
import AddNewPackageModal from "./AddNewPackageModal/AddNewPackageModal";
import "./Packages.scss";

const Packages = () => {
  const loggedInUser = useAppSelector((state) => state.login.user);
  const myPackages = useAppSelector((state) => state.packages);
  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser) {
      navigate.push("/loginSignup?message=packages");
    }
  }, [loggedInUser, navigate]);

  function onClose() {
    setOpen(false);
  }

  async function removePackage(itemId: string) {
    const updatedPackages = myPackages.filter((item) => item._id !== itemId);
    dispatch(setMypackages(updatedPackages));
    try {
      await deletePackage(itemId);
    } catch (err) {
      console.error(err);
    }
  }

  function goShopping() {
    navigate.push("/");
  }

  function checkout(packageId: string) {
    navigate.push(`/checkout/${packageId}`);
  }

  return (
    <div className="app__packages">
      {loggedInUser && open && (
        <AddNewPackageModal
          open={open}
          onClose={onClose}
          myPackages={myPackages}
          loggedInUser={loggedInUser}
        />
      )}

      {myPackages && (
        <>
          <div className="crumbs mt-[5rem] cursor-pointer">
            <Breadcrumbs>
              <Link underline="hover" style={{ color: "#E09132" }}>
                <span onClick={()=>navigate.push('/')}>Home</span>
              </Link>
              <Typography color="text.primary">Packages</Typography>
            </Breadcrumbs>
          </div>

          <div className="package-card grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2">
            {myPackages.map((item, index) => (
              <div key={index} className="card">
                <Image
                  className="package-img"
                  src={Images.packageIcon2}
                  alt="package-cion"
                />
                <h3 className="package-name">{item.packageName}</h3>
                <p className="package-items">
                  {item.items && item.items.length > 0 ? item.items.length : 0}{" "}
                  Items
                </p>
                <h4 className="package-total">
                  Total: Ksh.{" "}
                  {item.items?.reduce((total, item) => {
                    if (item.price) {
                      return total + item.price;
                    }
                    return 0;
                  }, 0) || 0}
                </h4>

                <div className="package-footer">
                  <div
                    className="delete"
                    onClick={() => removePackage(item._id)}
                  >
                    <Image
                      src={Images.deleteIcon}
                      alt="delete-icon"
                      width={30}
                    />
                  </div>

                  {item.items && item.items.length > 1 ? (
                    <button
                      className="view-checkout sm:text-[15px] text-[.8rem] px-1"
                      onClick={() => checkout(item._id)}
                    >
                      View / Checkout
                    </button>
                  ) : (
                    <button
                      onClick={() => goShopping()}
                      className="view-checkout"
                    >
                      Go Shopping
                    </button>
                  )}
                </div>
              </div>
            ))}

            {myPackages.length <= 4 ? (
              <div className="card add-new" onClick={() => setOpen(true)}>
                <Image
                  src={Images.addPackageIcon}
                  className="package-img"
                  alt="add-icon"
                  priority={true}
                  width={130}
                />
                <h3 className="package-name">Add New</h3>
              </div>
            ) : (
              <div className="card cannot-add">
                <Image
                  src={Images.forbiddenIcon}
                  className="package-img"
                  alt="forbidden-icon"
                  priority={true}
                />
                <h3 className="package-name">Cannot add</h3>
                <p className="package-total">Only 5 packages allowed</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Packages;
