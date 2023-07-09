import { useNavigate } from "react-router-dom";
import { Images } from "../../../constants";
import { Product } from "../../../models/product";
import { User } from "../../../models/user";
import { imageStreamer } from "../../../network/products";
import "./Category.scss";

interface CategoryProps {
    categoryName: string,
    query: string,
    products: Product[] | undefined,
    loggedInUser: User | null,
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setPrice: React.Dispatch<React.SetStateAction<number>>,
}



const Category = ({  categoryName, query, products, loggedInUser, setSelectedProduct, setOpen, setPrice } : CategoryProps) => {
    const navigate = useNavigate();

    function selectItemManager(product: Product) {
        if (loggedInUser) {
            setSelectedProduct(product);
            setOpen(true);
            setPrice(product.price);
        } else {
            navigate('/loginSignup/add');
        }
    }
       
    return (
        <div className="app__card">
            <div className="card-title">
                <div></div>
                <h3>{categoryName}</h3>
                <div></div>
                <section onClick={() => navigate(`/search/${query}`)} className='seeAll'><h4>See all <img src={Images.nextIcon} alt='next'/> </h4></section>
                <div></div>
            </div>
            <hr/>
            <br />

            <div className="card-body">
               { products?.map((item, index) => (
                    <div key={index} className="card" onClick={() => selectItemManager(item)}>
                        <img className='product-img' src={imageStreamer(item.productImgKey)} alt={item.productName}/>
                        <p className='name'>{item.productName}</p>
                        <p className='price'>Ksh. {item.price}</p>
                        <p className='quantity'>per kg</p>
                        <div className='add'>
                            <img src={Images.addIcon}  alt='add'/>
                            <img src={Images.cartIcon}  alt='add'/>
                        </div>
                        

                    </div>
                ))}
            </div>

            <br />            
            <hr/>
        </div>
     );
}
 
export default Category;