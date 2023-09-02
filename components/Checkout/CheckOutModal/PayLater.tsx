import { Images } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { User } from '@/models/user';
import { createOrder } from '@/network/order';
import { setOrders } from '@/redux/reducers/OrdersReducer';
import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

interface PayLaterProps {
    loggedInUser: User | null;
    packageId: string;
    price: string;

}

const PayLater = ({ loggedInUser, packageId, price }: PayLaterProps) => {
    const [phoneNumberClassName, setPhoneNumberClassName] = useState("");
    const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
    const [phoneNumber, setphoneNumber] = useState(
        loggedInUser
            ? loggedInUser.phoneNumber.toString().split("").slice(3).join("")
            : ""
    );
    const fieldPhoneNumber = useRef<HTMLInputElement>(null);
    const [isSubmitting, setisSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useRouter();
    const orders = useAppSelector(state => state.orders);



    function onPhoneNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
        setphoneNumber(event.target.value);
        const phoneNumber = event.target.value;
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const intPhoneNumber = parseInt(phoneNumber);

        setTimeout(() => {
            // condtion checking for mobile numbers
            if (
                intPhoneNumber.toString().length !== 9 ||
                !numbers.includes(phoneNumber[phoneNumber.length - 1]) ||
                (phoneNumber[0] !== "7" && phoneNumber[0] !== "1")
            ) {
                setPhoneNumberClassName("input-warning");
                setPhoneNumberMessage("Enter a valid phone number");
            } else {
                setPhoneNumberClassName("input-ok");
                setPhoneNumberMessage("");
            }
        }, 500);
    }

    async function submit() {
        setisSubmitting(true);
        let order;
        if (fieldPhoneNumber.current?.value)
            order = {
                userId: loggedInUser?._id || '',
                price: price.toString(),
                packageId: packageId,
                paymentType: 'later',
                phoneNumber: "254" + fieldPhoneNumber.current.value,
            };

        try {
            let response;
            if (order) {
                response = await createOrder(order, packageId)
                dispatch(setOrders([response, ...orders]));
                if (response) {
                    navigate.push("/orders");
                    setisSubmitting(false);
                }
            };

        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="modal">
            <p className='text-center text-md font-semibold text-yellow'>Confirm your contact number</p>

            <div className={`${phoneNumberClassName} phone-stuff`}>
                <Image priority={true} src={Images.phoneIcon} alt="profile-icon" />
                <div className="mobile-number px-2">+254</div>
                <input
                    type="number"
                    placeholder="Mpesa Number"
                    defaultValue={phoneNumber}
                    ref={fieldPhoneNumber}
                    onChange={onPhoneNumberChange}
                />
            </div>

            {phoneNumberMessage && (
                <p className="text-danger">{phoneNumberMessage}</p>
            )}
            <button
                className={`${phoneNumberMessage ? "inactive" : ""} flex justify-center place-items-center`}
                onClick={() => submit()}
            >
                {!isSubmitting && <p>Checkout</p>}
                {isSubmitting && <CircularProgress color="inherit" size={30} />}
            </button>
        </div>
    )
}

export default PayLater