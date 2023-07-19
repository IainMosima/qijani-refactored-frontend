import "./Footer.scss";
import Image from "next/image";
import { Images } from "@/constants";

const Footer = () => {
    return (
        <div className="app__footer">
            <div className="upper-section">
                <div className="footer-card horizontal-line">
                    <div>
                        <h3><b>Get to know us</b></h3>
                        <ul>
                            <li><a href='#/'>About us</a></li>
                            <li><a href='#/'>Carrers</a></li>
                            <li><a href='#/'>T's and C's</a></li>
                        </ul>
                    </div>

                    <div className="payment-methods">
                        <h3><b>Payment methods</b></h3>
                        <div >
                            {/* <Image className="cash" src={Images.cashIcon} alt="mpesa-icon" /> */}
                            <Image className="mpesa" src={Images.mpesaIcon} alt="mpesa-icon" />
                            <Image className="icon" src={Images.visaIcon} alt="visa-icon" />
                        </div>
                    </div>
                </div>

                <div className="footer-card">
                    <div className="column2">
                        <div>
                            <h3><b>Need Assistance?</b></h3>
                            <ul>
                                <li><a href='#/'>Help centre</a></li>
                            </ul>
                        </div>
                        <div className="socials">
                            <h3><b>Follow Us</b></h3>
                            <div>
                                <a href='#/'>
                                    <Image className="icons" src={Images.linkedInIcon} alt="linkedIn-icon" />
                                </a>
                                <a href='#/'>
                                    <Image className="icons" src={Images.twitterIcon} alt="linkedIn-icon" />
                                </a>
                                <a href='#/'>
                                    <Image className="icons" src={Images.facebookIcon} alt="linkedIn-icon" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="lower-section">
                <p>© 2023 E-SOKO. All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;