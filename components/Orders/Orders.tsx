/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAppSelector } from "@/hooks/reduxHook";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Orders.scss";


const Orders = () => {
  const orders = useAppSelector(state => state.orders);

  return (
    <div className="app__orders">
      <div className="results">
        <h2 className="heading">My Orders</h2>
        <div className="underline"></div>

        <div className="table-head">
          <h3>Order ID</h3>
          <h3>Package Name</h3>
          <h3>Amount</h3>
          <h3>Payment</h3>
          <h3>Status</h3>
        </div>

        <div className="frame">
          {orders.map((order) => (
            <div key={order._id}>
              <OrderDetails order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
