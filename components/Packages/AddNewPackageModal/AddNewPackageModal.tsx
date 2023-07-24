'use client';
import Dialog from "@mui/material/Dialog";
import { PackageStructure } from "../../../models/package";
import { Images } from "../../../constants";
import "./AddNewPackageModal.scss";
import { useForm } from "react-hook-form";
import { User } from "../../../models/user";
import { createNewPackage } from "../../../network/package";
import Image from "next/image";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setMypackages } from "@/redux/reducers/packagesReducer";

interface AddNewPackageModalProps {
    open: boolean,
    onClose: () => void,
    myPackages: PackageStructure[],
    loggedInUser: User
}

const AddNewPackageModal = ({open ,onClose, myPackages, loggedInUser } : AddNewPackageModalProps) => {
    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    async function onSubmit(data: Record<string, any>){
        const packageName = data.packageName;
        try {
          const newPackages = await createNewPackage({userId: loggedInUser._id, packageName: packageName});
          dispatch(setMypackages([...myPackages, {_id: newPackages._id, userId: loggedInUser._id, packageName: packageName, items: packageName.items}]));
            onClose();
        } catch (error) {
          console.log(error);
        }
      }
    
    return ( 
        <Dialog
         open={open}
         onClose={onClose}
        >
            <div className="app__AddpackageModal">
                <div className="title">
                    <h2>Add New package</h2>
                    <Image src={Images.closeIcon} alt='close-icon' onClick={onClose}/>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div  className="field">
                        <input type='text' placeholder="Enter Package Name" autoComplete="off" {...register('packageName')}/>

                        <button>Add</button>
                    </div>
                </form>
            </div>
        </Dialog>
     );
}
 
export default AddNewPackageModal;