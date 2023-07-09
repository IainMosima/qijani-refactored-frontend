import "./Footer.scss";
import { Images } from "../../constants";

const Footer = () => {
    return ( 
        <div className="app__footer">
            <div className="upper-section">
                <div className="footer-card horizontal-line">
                    <div>
                        <h3>Get to know us</h3>
                        <ul>
                            <li><a href='#/'>About us</a></li>
                            <li><a href='#/'>Carrers</a></li>
                            <li><a href='#/'>T's and C's</a></li>
                        </ul>
                    </div>

                    <div className="payment-methods">
                        <h3>Payment methods</h3>
                        <div >
                            <img src={Images.visaIcon} alt="visa-icon"/>
                            <img src={Images.mpesaIcon} alt="mpesa-icon"/>
                        </div>
                    </div>
                </div>

                <div className="footer-card">
                    <div>
                        <h3>Need Some Assistance</h3>
                        <ul>
                            <li><a href='#/'>Help centre</a></li>
                        </ul>
                    </div>

                    <div className="socials">
                        <h3>Follow Us</h3>
                        <div>
                            <a href='#/'>
                                <img src={Images.linkedInIcon} alt="linkedIn-icon"/>
                            </a>
                            
                            <a href='#/'>
                                <img src={Images.twitterIcon} alt="linkedIn-icon"/>
                            </a>

                            <a href='#/'>
                                <img src={Images.facebookIcon} alt="linkedIn-icon"/>
                            </a>
                            
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