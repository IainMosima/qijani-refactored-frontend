import Image from "next/image";

import { Images } from "../../../constants";
import "./NoOrders.scss";
import Link from "next/link";


const NoOrders = () => {
    return ( 
        <div className="app__no_orders">
            <Image src={Images.noOrderIcon} alt="binoculars" priority={true}/>

            <div>
                <h2>Oops! No Orders Found</h2>
                <h2>Tip:</h2>
                <ul className="list-disc list-inside">
                    <li>Try checking out a package
                    </li>
                </ul>
                <Link href='/packages'>
                    <button>Go To My Packages</button>
                </Link>
            </div>
        </div>
     );
}
 
export default NoOrders;