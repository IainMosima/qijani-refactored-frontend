import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setMypackages } from "@/redux/reducers/packagesReducer";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Images } from "../../../constants";
import {
  ItemStructure,
  NewPackage,
  UpdatedPackage
} from "../../../models/package";
import { Product } from "../../../models/product";
import { User } from "../../../models/user";
import {
  createNewPackage,
  fetchPackages,
  updatePackage,
} from "../../../network/package";
import { itemManager } from "../../../utils/itemManager";
import "./AddPackageModal.scss";

interface AddPackageModalProps {
  open: boolean;
  loggedInUser: User;
  product: Product;
  onClose: () => void;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  setSetsuccessfulyAdded: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  selectedProduct: Product;
}
const AddPackageModal = ({
  open,
  loggedInUser,
  product,
  onClose,
  price,
  setPrice,
  setSetsuccessfulyAdded,
  setSuccessMessage,
  selectedProduct,
}: AddPackageModalProps) => {
  const myPackages = useAppSelector((state) => state.packages);
  const dispatch = useAppDispatch();
  const [existing, setExisting] = useState(
    myPackages.length <= 4 ? true : false
  );
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newPackage, setNewPackage] = useState<NewPackage | null>();
  const names = myPackages.map((item) => item.packageName);
  const [addToExisting, setaddToExisting] = useState<UpdatedPackage>({
    packageId: myPackages
      .filter((item) => item.packageName === names[0])
      .map((item) => item._id)[0],
    userId: loggedInUser._id,
    packageName: names[0],
    items: [
      ...(myPackages
        .filter((item) => item.packageName === names[0])
        .map((item) => item.items)[0] || []),
      { productId: product._id, price: product.price },
    ],
  });
  const [token, setToken] = useState("");
  const quantityInput = useRef<HTMLInputElement>(null);
  const packageName = useRef<HTMLInputElement>(null);
  const existingPackageValue = useRef<HTMLSelectElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(
    myPackages.length <= 4 ? true : false
  );
  const [packageNameWarning, setPackageNameWarning] = useState(false);
  const packagenames = myPackages?.map((item) => item.packageName);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, [])

  function priceCalc() {
    if (quantityInput.current?.value) {
      const total = product.price * parseFloat(quantityInput.current.value);
      setPrice(total);
      if (product.unit.split(',')[0] === 'kg') {
        return total;
      }
      return Number(total);
    }
  }

  function existingManger() {
    setSubmitDisabled(false);
    setExisting(!existing);
    setIsUpdating(true);
  }

  function addToNewManager() {
    setExisting(!existing);
    setSubmitDisabled(true);
  }

  function newPackageName(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;

    if (packagenames && packagenames.includes(name)) {
      setPackageNameWarning(true);
      setSubmitDisabled(true);
    } else {
      setPackageNameWarning(false);
      setSubmitDisabled(false);
    }

    if (name.length < 1) {
      setSubmitDisabled(true);
    }

    if (loggedInUser?._id) {
      setNewPackage({
        userId: loggedInUser._id,
        packageName: name,
        productId: product._id,
        price: price,
      });
    }
  }

  function existingPackage(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value.split(",");
    const packageId = value[0];
    const packageName = value[1];
    const productId = product._id;
    const items = myPackages
      ?.filter((item) => item._id === packageId)
      .map((item) => item.items)[0];
    let updatedItems: ItemStructure[] = [];
    if (items) updatedItems = itemManager(items, productId, price);
    setSubmitDisabled(false);

    if (loggedInUser?._id && items) {
      setaddToExisting({
        userId: loggedInUser._id,
        packageId: packageId,
        packageName: packageName,
        items: updatedItems,
      });
    }
  }

  function quantityChange(event: React.ChangeEvent<HTMLInputElement>) {
    const updatedPrice = priceCalc();
    if (isUpdating && updatedPrice) {
      let updatedItems = itemManager(
        addToExisting.items,
        product._id,
        updatedPrice
      );
      setaddToExisting((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  }

  function quantityDecrement(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const unit = product.unit.split(",")[0];
    const decrement = product.unit.split(",")[1];
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
    if (isUpdating) {
      let updatedPrice = priceCalc() || price;
      let updatedItems = itemManager(
        addToExisting.items,
        product._id,
        updatedPrice
      );
      setaddToExisting((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  }

  function quantityIncrement(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const unit = product.unit.split(",")[0];
    const decrement = product.unit.split(",")[1];
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
    if (isUpdating) {
      let updatedPrice = priceCalc() || price;
      let updatedItems = itemManager(
        addToExisting.items,
        product._id,
        updatedPrice
      );
      setaddToExisting((prevState) => ({
        ...prevState,
        items: updatedItems,
      }));
    }
  }

  async function submit() {
    setisSubmitting(true);
    if (newPackage) {
      let response;
      try {
        if (token) response = await createNewPackage(newPackage, token);
        if (response && packageName.current?.value) {
          setisSubmitting(false);
          packageName.current.value = "";
          dispatch(
            setMypackages([
              ...myPackages,
              {
                _id: response._id,
                userId: response.userId,
                packageName: response.packageName,
                items: response.items,
              },
            ])
          );
          setNewPackage(null);
          setSuccessMessage(
            `Successfully added ${selectedProduct.productName} to package "${response.packageName}"`
          );
          setSetsuccessfulyAdded(true);
          onClose();
        }
      } catch (error) {
        console.error(error);
      }
    } else if (addToExisting) {
      let response;
      let updatedPackages;
      try {
        if (token) response = await updatePackage(addToExisting, token);
        if (token) updatedPackages = await fetchPackages(token);

        if (response && updatedPackages) {
          setisSubmitting(false);
          dispatch(setMypackages(updatedPackages));
          setSuccessMessage(
            `Successfully updated ${selectedProduct.productName} to package "${response.data.packageName}"`
          );
          setSetsuccessfulyAdded(true);
          onClose();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="app__AddPackagemodal lg:w-[30rem] md:w-[25rem] w-[19rem]">
        <div className="title">
          <h2 className="sm:text-2xl text-lg">
            {product.productName}. <span>kshs {product.price}</span>.{" "}
            <span className="italic">per {`${product.unit.split(', ')[1] === '1' ? product.unit.split(', ')[0] : product.unit.split(', ')[1] + product.unit.split(', ')[0] + '(s)'}`}</span>
          </h2>
          <Image src={Images.closeIcon} onClick={onClose} alt="close-icon" />
        </div>
        <div className="description">
          <div>
            <div className="field amount">
              <label>Quantity: </label>
              <div>
                <button
                  className="border border-black w-[1.5rem] flex place-items-center justify-center h-[1.5rem] decrement"
                  onClick={quantityDecrement}
                >
                  <Image src={Images.minusIcon} alt="minus icon" width={10} />
                </button>

                <input
                  type="number"
                  ref={quantityInput}
                  min="0"
                  defaultValue="1"
                  max="100"
                  step="0.1"
                  onChange={quantityChange}
                  className=""
                />

                <button
                  className="border border-black w-[1.5rem] flex place-items-center justify-center h-[1.5rem] increment"
                  onClick={quantityIncrement}
                >
                  <Image src={Images.plusIcon} alt="plus icon" width={10} />
                </button>
              </div>
              <label className="italic">{`${product.unit.split(', ')[1] == '2' ? 'piece' : product.unit.split(', ')[0]}(s)`}</label>
            </div>

            {!existing && myPackages && myPackages.length > 0 && (
              <div className="field package">
                <label className="sm:text-[1.3rem] text-[1rem]">
                  Add to existing package
                </label>
                <select
                  ref={existingPackageValue}
                  onChange={existingPackage}
                  className=" placeholder:text-[1rem] border-black px-1 py-2 rounded-md sm:w-auto w-[11rem]"
                >
                  {myPackages?.map((item, index) => (
                    <option key={index} value={[item._id, item.packageName]}>
                      {item.packageName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {existing && myPackages && myPackages.length <= 4 && (
              <div className="field package">
                <label className="sm:text-[1.3rem] text-[1rem]">
                  Add to new package
                </label>
                <input
                  type="text"
                  ref={packageName}
                  onChange={newPackageName}
                  placeholder="Enter package name"
                  className="border h-[1.5rem] placeholder:text-[1rem] border-black px-2 py-2 rounded-md sm:w-auto w-[10rem]"
                />
              </div>
            )}

            {packageNameWarning && (
              <>
                <p className="package-warning sm:text-[1.2rem] text-[1rem]">
                  Package name already exists, try another name.
                </p>
                <br />
              </>
            )}

            {existing && myPackages && myPackages.length > 0 && (
              <div>
                <p
                  className="destination existing sm:text-[1.2rem] text-[1rem]"
                  onClick={() => existingManger()}
                >
                  Add to an existing package?
                </p>
              </div>
            )}

            {!existing && myPackages && myPackages.length <= 4 && (
              <div>
                <p
                  className="destination"
                  text-yellow
                  onClick={() => addToNewManager()}
                >
                  Add to a new package?
                </p>
              </div>
            )}

            <div className="footer">
              <h3 className="sm:text-[1.7rem] text-[1.5rem]">
                Total: Kshs {price}
              </h3>
              <button
                onClick={() => submit()}
                disabled={submitDisabled}
                className={`${submitDisabled ? "submit-disabled" : ""
                  } flex justify-center place-items-center`}
              >
                {!isSubmitting ? (
                  <p>Add</p>
                ) : (
                  <CircularProgress color="inherit" size={30} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddPackageModal;
