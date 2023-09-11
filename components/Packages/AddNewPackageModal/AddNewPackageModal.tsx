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
import { useEffect, useState } from "react";

interface AddNewPackageModalProps {
    open: boolean,
    onClose: () => void,
    myPackages: PackageStructure[],
    loggedInUser: User
}

const AddNewPackageModal = ({ open, onClose, myPackages, loggedInUser }: AddNewPackageModalProps) => {
    const [token, setToken] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setToken(token);
    }, []);

    const { register, handleSubmit } = useForm();
    const dispatch = useAppDispatch();
    async function onSubmit(data: Record<string, any>) {
        const packageName = data.packageName;
        let newPackages;
        try {
            if (token) newPackages = await createNewPackage({ userId: loggedInUser._id, packageName: packageName }, token);
            if (newPackages) dispatch(setMypackages([...myPackages, { _id: newPackages._id, userId: loggedInUser._id, packageName: packageName, items: packageName.items }]));
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
                    <h2 className="text-md">Add New package</h2>
                    <Image src={Images.closeIcon} alt='close-icon' onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <input type='text' placeholder="Enter Package Name" autoComplete="off" {...register('packageName')} className="border border-black rounded-sm " />

                        <button>Add</button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

export default AddNewPackageModal;