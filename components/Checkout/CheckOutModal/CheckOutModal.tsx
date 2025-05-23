"use client";
import { Dialog } from "@mui/material";
import { User } from "../../../models/user";
import "./CheckOutModal.scss";
import PayNow from "./PayNow";
import { useState } from "react";
import PayLater from "./PayLater";
import { useRouter } from "next/navigation";



interface CheckOutModalProps {
  loggedInUser: User | null;
  price: string;
  packageId: string;
  open: boolean;
  onClose: () => void;


}

const CheckOutModal = ({
  loggedInUser,
  price,
  packageId,
  open,
  onClose,

}: CheckOutModalProps) => {
  const [payNow, setPayNow] = useState(true);
  const navigate = useRouter();


  return (
    <Dialog open={open} onClose={onClose}>
      <div className="w-30rem py-7">
        {/* <div className="navigators sm:gap-[10rem] w-full gap-[3rem] text-[1.2rem] px-7 mb-3">
          <h3 className={payNow ? 'active' : ''} onClick={()=>setPayNow(true)}>Pay Now</h3>
          <h3 className={!payNow ? 'active' : ''} onClick={()=>setPayNow(false)}>Pay Later</h3>
        </div> */}
        {!payNow ? (
          <PayNow loggedInUser={loggedInUser}
            packageId={packageId}
            price={price}

          />
        ) : (
          <PayLater loggedInUser={loggedInUser}
            packageId={packageId}
            price={price}
          />
        )}
      </div>
    </Dialog>
  );
};

export default CheckOutModal;
