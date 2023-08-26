import { Images } from '@/constants';
import { createOrder } from '@/network/order';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { User } from '@/models/user';

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
    const paymentType = useRef<HTMLInputElement>(null);
    const [isSubmitting, setisSubmitting] = useState(false);
    const navigate = useRouter();

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
                userId: loggedInUser?._id,
                price: price.toString(),
                packageId: packageId,
                paymentType: paymentType.current?.value,
                phoneNumber: "254" + fieldPhoneNumber.current.value,
            };

        try {
            let response;
            if (order) response = await createOrder(order, packageId);

            if (response) {
                navigate.push("/orders");
                setisSubmitting(false);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="modal">
            {isSubmitting && <h3>Wait for an M-Pesa prompt in your phone</h3>}
            <div className="title">
                <div>
                    <label>
                        <input type="radio" ref={paymentType} value="mpesa" checked />
                        Mpesa
                    </label>
                </div>
            </div>

            <div className={`${phoneNumberClassName} phone-stuff`}>
                <Image priority={true} src={Images.phoneIcon} alt="profile-icon" />
                <div className="mobile-number px-1">+254</div>
                <input
                    type="text"
                    placeholder="Mpesa Number"
                    value={phoneNumber}
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