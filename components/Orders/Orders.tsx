/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Orders.scss";
import NoOrders from "./NoOrders/NoOrders";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { cancelOrder } from "@/network/order";
import { setOrders } from "@/redux/reducers/OrdersReducer";


const Orders = () => {
  const orders = useAppSelector(state => state.orders);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  
  function onClose() {
    setOpen(false);
  }

  async function deleteOrder(orderId: string, packageName: string) {
    dispatch(setOrders(orders.filter(order => order._id !== orderId)));
    const response = await cancelOrder(orderId);
    console.log(response);
  }

  return (
    <div className="app__orders">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={onClose}
        autoHideDuration={3000}
      >
        <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
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
                <OrderDetails order={order} deleteOrder={deleteOrder} setMessage={setMessage}/>
              </div>
            ))}
          </div>
        </div>
      ) : (<NoOrders />)}

    </div>
  );
};

export default Orders;
