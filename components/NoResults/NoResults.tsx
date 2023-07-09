import { Link, useParams } from "react-router-dom";
import { Images } from "../../constants";
import "./NoResults.scss";


const NoResults = () => {
    const { query } = useParams();
    return ( 
        <div className="app__no_results">
            <img src={Images.binoculars} alt="binoculars"/>

            <div>
                <h2>No Results Found for <span>"{query}"</span></h2>
                <h2>Tips:</h2>
                <ul>
                    <li>Make sure that all words are spelled correctly.
                    </li>
                    <li>Try searching with short and simple keywords.
                    </li>
                    <li>Try different keywords.</li>
                </ul>
                <Link to='/'>
                    <button>Go To Homepage</button>
                </Link>
            </div>
        </div>
     );
}
 
export default NoResults;