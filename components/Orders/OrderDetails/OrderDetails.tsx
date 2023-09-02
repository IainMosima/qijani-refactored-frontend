import { useEffect, useState } from "react";
import { PackageStructure } from "../../../models/package";
import "./OrderDetails.scss";
import { getPackage } from "../../../network/package";
import { OrderStructure } from "../../../models/order";
import { Images } from "../../../constants";
import Image from "next/image";


interface OrderDetailsProps {
  order: OrderStructure;
  deleteOrder: (orderId: string, packageName: string, index: number) => void;
  index: number;
}


const OrderDetails = ({ order, deleteOrder, index }: OrderDetailsProps) => {
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

  }, [order.packageId]);

  console.log(order);
  return (
    <div className="app__OrderDetails flex place-items-center ">
      {packageInfo &&
        <div className="table-body text-center">
          {/* <p>{order._id?.split('').slice(0, 9).join('')}</p> */}
          <p >{packageInfo.packageName}</p>

          <p>Ksh {order.price}</p>

          <div className="w-full">
            {order.paymentStatus === 'pending' && (
              <div className="status bg-gray mx-auto px-2 py-1 my-auto sm:gap-2">
                <Image src={Images.pendingIcon} alt="pending Icon" width={20} />
                <p>Pending</p>
              </div>

            )}

            {order.paymentStatus === 'paid' && (
              <div className="status bg-success text-white mx-auto px-2 py-1 my-auto sm:gap-2">
                <Image src={Images.successIcon} alt="pending Icon" width={20} />
                <p>Paid</p>
              </div>
            )}

          </div>

          <p>En Route</p>

          <Image src={Images.cancelIcon} alt="delete-icon" className="cursor-pointer" width={22} onClick={() => deleteOrder(order._id, packageInfo.packageName, index)} />
        </div>
      }

    </div>
  );
}


export default OrderDetails;