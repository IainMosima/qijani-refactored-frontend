/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import OrderDetails from "./OrderDetails/OrderDetails";
import "./Orders.scss";
import NoOrders from "./NoOrders/NoOrders";
import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { cancelOrder } from "@/network/order";
import { setOrders } from "@/redux/reducers/OrdersReducer";
import { useRouter } from "next/navigation";

const Orders = () => {
  const orders = useAppSelector(state => state.orders);
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.login.user);
  const navigate = useRouter();

  function onClose() {
    setOpen(false);
  }

  async function deleteOrder(orderId: string, packageName: string, index: number) {
    dispatch(setOrders(orders.filter((order, i) => i !== index)));
    if (token) await cancelOrder(orderId, token).then(() => { setMessage(`Canceled order for package ${packageName}`); setOpen(true) }).catch(() => alert("Something went wrong, please refresh page"));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    if (!loggedInUser) {
      navigate.push("/loginSignup?message=orders");
    }
  }, [loggedInUser, navigate]);


  return (
    <div className="app__orders">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={onClose}
        autoHideDuration={3000}
      >
        <Alert onClose={onClose} severity="warning" sx={{ width: "100%" }}>
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
                <OrderDetails order={order} deleteOrder={deleteOrder} index={index} />
              </div>
            ))}
          </div>
        </div>
      ) : (<NoOrders />)}

    </div>
  );
};

export default Orders;
