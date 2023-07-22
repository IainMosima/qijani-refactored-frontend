import { Link } from "react-router-dom";
import { Images } from "../../../constants";
import "./NoOrders.scss";


const NoOrders = () => {
    return ( 
        <div className="app__no_orders">
            <img src={Images.noOrderIcon} alt="binoculars"/>

            <div>
                <h2>Oops! No Orders Found</h2>
                <h2>Tip:</h2>
                <ul>
                    <li>Try checking out a package
                    </li>
                </ul>
                <Link to='/packages'>
                    <button>Go To My Packages</button>
                </Link>
            </div>
        </div>
     );
}
 
export default NoOrders;