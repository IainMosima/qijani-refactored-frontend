import { useEffect, useState } from "react";
import {  PackageStructure } from "../../../models/package";
import "./OrderDetails.scss";
import { getPackage } from "../../../network/package";
import { OrderStructure } from "../../../models/order";
import { Images } from "../../../constants";
import Image from "next/image";



interface OrderDetailsProps {
  order: OrderStructure
}




const OrderDetails = ({ order } : OrderDetailsProps) => {
  const [packageInfo, setPackageInfo] = useState<PackageStructure>();


    useEffect(() => {
      async function fetchPackage() {
        try {
          const response = await getPackage(order.packageId || '');
          setPackageInfo(response);
        } catch (err) {
          console.log(err);
        }
      }
      
      fetchPackage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return ( 
        <div className="app__OrderDetails">
            {packageInfo &&
              <div className="table-body">
                  <p>{order._id?.split('').slice(0,9).join('')}</p>
                  <p >{packageInfo.packageName}</p>
                  <p>Ksh {order.price}</p>
                  <div className="pending">
                    <Image src={Images.pendingIcon} alt="pending Icon"/>
                    <p>Pending</p>
                  </div>
                  <p>...</p>

            </div>
            }
              
        </div>
     );
}

 
export default OrderDetails;