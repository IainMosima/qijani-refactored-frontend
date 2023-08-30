import Image from "next/image";

import { Images } from "../../../constants";
import "./NoOrders.scss";
import Link from "next/link";


const NoOrders = () => {
    return ( 
        <div className="flex justify-center gap-3 app__no_orders max-h-screen">
            <div className="flex place-items-center">
                <Image src={Images.noOrderIcon} alt="binoculars" priority={true} width={100} height={130}/>
            </div>

            <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold">Oops! No Orders Found</h2>
                <h2 className="text-md font-semibold">Tip:</h2>
                <ul className="list-disc list-inside">
                    <li>Try checking out a package
                    </li>
                </ul>
                
                <Link href='/packages'>
                    <button>Go To Packages page</button>
                </Link>
            </div>
        </div>
     );
}
 
export default NoOrders;