/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAppSelector } from "@/hooks/reduxHook";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Orders.scss";
import NoOrders from "./NoOrders/NoOrders";


const Orders = () => {
  const orders = useAppSelector(state => state.orders);
  
  return (
    <div className="app__orders">
      {orders.length > 0 ? (
        <div className="results">
          <h2 className="heading text-[1.5rem]">My Orders</h2>
          <div className="underline"></div>

          <div className="table-head text-center">
            {/* <h3>Order ID</h3> */}
            <h3>Package Name</h3>
            <h3>Amount</h3>
            <h3>Payment</h3>
            <h3>Status</h3>
          </div>

          <div className="frame">
            {orders.map((order, index) => (
              <div key={index}>
                <OrderDetails order={order} />
              </div>
            ))}
          </div>
        </div>
      ):(<NoOrders />)}

    </div>
  );
};

export default Orders;
