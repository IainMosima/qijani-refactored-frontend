import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { PackageStructure } from "../../models/package";
import { User } from "../../models/user";
import { Images } from "../../constants";

import "./Packages.scss";
import { deletePackage } from "../../network/package";
import AddNewPackageModal from "./AddNewPackageModal/AddNewPackageModal";
import {  useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface PackageProps {
    loggedInUser: User | null,
    myPackages: PackageStructure[],
    setMyPackages: React.Dispatch<React.SetStateAction<PackageStructure[]>>;
}

const Packages = ({loggedInUser, myPackages, setMyPackages: setmyPackages }: PackageProps) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    
    
    if (!loggedInUser) {
        navigate('/loginSignup/packages');
    }

    function onClose() {
        setOpen(false);
    }

    async function removePackage(itemId: string) {
        const updatedPackages = myPackages.filter(item => item._id !== itemId);
        setmyPackages(updatedPackages);
        try {
            await deletePackage(itemId);            
        } catch (err) {
            console.error(err);
        }
    }

    function goShopping() {
        navigate('/');
    }

    function checkout(packageId: string) {
        navigate(`/checkout/${packageId}`);
    }

    
    return ( 
        <div className="app__packages">
            
            {loggedInUser && open &&
                <AddNewPackageModal
                 open={open}
                 onClose={onClose}
                 setMyPackages={setmyPackages}
                 myPackages={myPackages}
                 loggedInUser={loggedInUser}
                />
            }

            {myPackages &&
                <>
                    <div className='crumbs'>
                        <Breadcrumbs>
                        <Link
                         underline='hover'
                         href='/'
                         style={{color: '#E09132'}}
                        >
                            Home
                        </Link>
                        <Typography color="text.primary">Packages</Typography>
                        </Breadcrumbs>
                    </div>

                    {!myPackages &&
                        <div className="spinner">
                            <CircularProgress size="4rem" color="inherit"/>
                        </div>
                    }
                    <div className="package-card">
                        {myPackages.map((item, index) => (
                            <div key={index} className='card'>
                                <img className="package-img" src={Images.packageIcon} alt='package-cion'/>
                                <h3 className="package-name">{item.packageName}</h3>
                                <p className="package-items">{item.items && item.items.length > 0 ? item.items.length : 0} Items</p>
                                <h4 className="package-total">Total: Ksh. {item.items?.reduce((total, item) => {
                                    if(item.price) {
                                        return  total + item.price;
                                    }
                                    return 0;
                                }, 0) || 0} 
                                </h4>

                                <div className="package-footer">
                                    <div className="delete" onClick={() => removePackage(item._id)}>
                                        <img src={Images.deleteIcon} alt="delete-icon"/>
                                    </div>

                                    {item.items && item.items.length > 1 ?
                                        (
                                            <button className="view-checkout" onClick={() => checkout(item._id)}>View / Checkout</button>
                                        )
                                        :
                                        (
                                            <button onClick={() => goShopping()} className="view-checkout">Go Shopping</button>
                                        )
                                    }
                                </div>
                                
                            </div>
                        ))
                        }
                        
                        {myPackages.length <= 4 ? 
                        (
                            <div className="card add-new" onClick={() => setOpen(true)}>
                                <img src={Images.addPackageIcon} className='package-img' alt='add-icon'/>
                                <h3 className="package-name">Add New</h3>
                            </div>
                        ) 
                        : (
                            <div className="card cannot-add">
                                <img src={Images.forbiddenIcon} className='package-img' alt='forbidden-icon'/>
                                <h3 className="package-name">Cannot add</h3>
                                <p className="package-total">Only 5 packages allowed</p>
                            </div>
                        )

                        }
                    </div>
                </>
            }
            
        

        </div> 
    );
}
 
export default Packages;