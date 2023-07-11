import "./AddPackageModal.scss";
import { Images } from "../../../constants";
import Dialog from "@mui/material/Dialog";
import { useRef, useState } from "react";
import { User } from "../../../models/user";
import { createNewPackage, updatePackage } from "../../../network/package";
import { Product } from "../../../models/product";
import { ItemStructure, NewPackage, PackageStructure, UpdatePackage } from "../../../models/package";
import CircularProgress from "@mui/material/CircularProgress";
import { itemManager } from "../../../utils/itemManager";
import Image from "next/image";

interface AddPackageModalProps {
    open: boolean,
    loggedInUser: User,
    product: Product,
    onClose: () => void,
    price: number,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
    myPackages: PackageStructure[],
    setmyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>,
    


}

const AddPackageModal = ({ open, loggedInUser, product, onClose, price, setPrice, myPackages, setmyPackages }: AddPackageModalProps) => {
    const [existing, setExisting] = useState(myPackages.length <= 4 ? true : false);
    const [isSubmitting, setisSubmitting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newPackage, setNewPackage] = useState<NewPackage | null>();
    const names = myPackages.map(item => item.packageName);
    const [addToExisting, setaddToExisting] = useState<UpdatePackage>({
        packageId: myPackages.filter(item => item.packageName === names[0]).map(item => item._id)[0],
        userId: loggedInUser._id,
        packageName: names[0],
        items: [...myPackages.filter(item => item.packageName === names[0]).map(item => item.items)[0] || [], {productId: product._id, price: product.price}]
    });
    
    const quantityInput = useRef<HTMLInputElement>(null);
    const packageName = useRef<HTMLInputElement>(null);
    const existingPackageValue = useRef<HTMLSelectElement>(null);
    const [submitDisabled, setSubmitDisabled] = useState(myPackages.length <= 4 ? true : false);
    const [packageNameWarning, setPackageNameWarning] = useState(false);
    const packagenames = myPackages?.map(item => item.packageName);

    function priceCalc(){
        if(quantityInput.current?.value){
            const total = product.price * parseFloat(quantityInput.current.value);
            setPrice(total);
            return total;
        }
    }

    function existingManger() {
        setSubmitDisabled(false);
        setExisting(!existing);
        setIsUpdating(true);
    }

    function addToNewManager () {
        setExisting(!existing);
        setSubmitDisabled(true);

    }

    function newPackageName(event: React.ChangeEvent<HTMLInputElement>){
        const name = event.target.value;

        if (packagenames && packagenames.includes(name)) {
            setPackageNameWarning(true);
            setSubmitDisabled(true);
        } else {
            setPackageNameWarning(false);
            setSubmitDisabled(false);
        }

        if(name.length < 1) {
            setSubmitDisabled(true);
        }

        
        if (loggedInUser?._id) {
            setNewPackage({
                userId: loggedInUser._id,
                packageName: name,
                productId: product._id,
                price: price
            })
        }
    }

    
    function existingPackage(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value.split(',');
        const packageId = value[0];
        const packageName = value[1];
        const productId = product._id;
        const items = myPackages?.filter(item => item._id === packageId).map(item => item.items)[0];
        let updatedItems: ItemStructure[] = [];
        if(items) updatedItems = itemManager(items, productId, price);
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
            let updatedItems = itemManager(addToExisting.items, product._id, updatedPrice);
            setaddToExisting(prevState => ({
                ...prevState,
                items: updatedItems
            }))
        }
    }
    


    function quantityDecrement (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if(quantityInput.current?.value && parseFloat(quantityInput.current?.value) > 0) {
            quantityInput.current.value = (parseFloat(quantityInput.current.value) - 0.5).toFixed(1);
            priceCalc();
        } 
        if (isUpdating) {
            const updatedPrice = priceCalc() || price;
            let updatedItems = itemManager(addToExisting.items, product._id, updatedPrice);
            setaddToExisting(prevState => ({
                ...prevState,
                items: updatedItems
            }))
        }
    }

    function quantityIncrement (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if(quantityInput.current?.value && parseFloat(quantityInput.current?.value) < 100) {
            quantityInput.current.value = (parseFloat(quantityInput.current.value) + 0.5).toFixed(1);
            priceCalc();
            if (isUpdating) {
                const updatedPrice = priceCalc() || price;
                let updatedItems = itemManager(addToExisting.items, product._id, updatedPrice);
                setaddToExisting(prevState => ({
                    ...prevState,
                    items: updatedItems
                }))
            }
        }
    }

    async function submit() {
        setisSubmitting(true);
        if(newPackage) {
            try{
                const response = await createNewPackage(newPackage);
                if (response && packageName.current?.value) {
                    setisSubmitting(false)
                    packageName.current.value = '';
                    setmyPackages([...myPackages, {
                        _id: response._id,
                        userId: response.userId,
                        packageName: response.packageName,
                        items: response.items
                    }])
                    setNewPackage(null);
                    onClose();

                }
            } catch(error) {
                console.error(error);                
            }
        } else if (addToExisting) {
            try {
                const response = await updatePackage(addToExisting);
                if (response) {
                    setisSubmitting(false);
                    onClose();
                }
            } catch(error) {
                console.error(error);
            }
        }
    }

    return (
        <Dialog
         open={open}
         onClose={onClose}
         
        >   
            <div className="app__AddPackagemodal">
                <div className="title">
                    <h2>{product.productName}. <span>kshs {product.price}</span>. <span>per kg</span></h2>
                    <Image src={Images.closeIcon} onClick={onClose} alt='close-icon'/>
                </div>
                <div className='description' >
                    <div>
                        <div className="field amount">
                            <label>Quantity (kg)</label>
                            <div>
                                <button className="decrement" onClick={quantityDecrement}>-</button>

                                <input type='number' ref={quantityInput}
                                 min='0' defaultValue="1" max='100' step='0.1' onChange={quantityChange}/>

                                <button className="increment" onClick={quantityIncrement}>+</button>
                            </div>
                        </div>
                        
                        {!existing && myPackages && (myPackages.length > 0) &&
                            <div className="field package">
                                <label>Add to existing package</label>
                                <select ref={existingPackageValue} onChange={existingPackage}>
                                    {myPackages?.map((item, index) => (
                                        <option key={index} value={[item._id, item.packageName]}>{item.packageName}</option>
                                    ))

                                    }
                                </select>
                            </div>
                        }
                        
                        {existing && myPackages && (myPackages.length <= 4) &&
                            <div className="field package">
                                <label>Add to new package</label>
                                <input type='text' ref={packageName} onChange={newPackageName} placeholder="Enter package name"/>
                            </div>
                        }

                        {packageNameWarning &&
                            <>
                                <p className="package-warning">Package name already exists, try another name.</p>
                                <br />
                            </>

                        }
                        
                        {existing && myPackages && (myPackages.length > 0) &&
                            <div>
                                <p className="destination existing" onClick={() => existingManger()}>Add to an existing package?</p>
                            </div>
                        }

                        {!existing && myPackages &&  (myPackages.length <= 4) &&
                            <div>
                                <p className="destination" onClick={() => addToNewManager()}>Add to a new package?</p>

                            </div>
                        }
                        
                        
                        <div className="footer">
                            <h3>Total: Kshs {price}</h3>
                            <button onClick={() => submit()} disabled={submitDisabled} className={submitDisabled ? 'submit-disabled' : ''}>
                                {!isSubmitting &&
                                    <p>Add</p>
                                }
                                {isSubmitting &&
                                    <CircularProgress color="inherit"/>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
        
     );
}
 
export default AddPackageModal;