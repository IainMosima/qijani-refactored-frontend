/* eslint-disable react-hooks/exhaustive-deps */
import "./Orders.scss";
import { OrderStructure } from "../../models/order";
import { useEffect, useState } from "react";
import { getOrders } from "../../network/order";
import NoOrders from "./NoOrders/NoOrders";
import OrderDetails from "./OrderDetails/OrderDetails";
import CircularProgress from "@mui/material/CircularProgress";

interface OrdersProps {
  orders: OrderStructure[];
  setOrders: React.Dispatch<React.SetStateAction<OrderStructure[]>>;
}

const Orders = ({ orders, setOrders }: OrdersProps) => {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchMyOrders() {
      try {
        const orders = await getOrders();

        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyOrders();

    const timeOutId = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <div className="app__orders">
      {loader && (
        <div className="spinner">
          <CircularProgress size="4rem" color="inherit" />
        </div>
      )}

      {!loader && orders.length < 1 && <NoOrders />}

      {!loader && orders.length > 0 && (
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
      )}
    </div>
  );
};

export default Orders;
