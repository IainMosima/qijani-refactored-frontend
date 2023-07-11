import Image from "next/image";
import { Images } from "../../../constants";
import { Product } from "../../../models/product";
import { User } from "../../../models/user";
import { imageStreamer } from "../../../network/products";
import { useRouter } from "next/navigation";
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



const Category = ({ categoryName, products, loggedInUser, setSelectedProduct, setOpen, setPrice } : CategoryProps) => {
    const navigate = useRouter();
    function selectItemManager(product: Product) {
        if (loggedInUser) {
            setSelectedProduct(product);
            setOpen(true);
            setPrice(product.price);
        } else {
            navigate.push('/loginSignup/add');
        }
    }
       
    return (
        <div className="app__card">
            <div className="card-title">
                <div></div>
                <h3>{categoryName}</h3>
                <div></div>
                <section  className='seeAll'><h4>See all <Image src={Images.nextIcon} alt='next'/> </h4></section>
                <div></div>
            </div>
            <hr/>
            <br />

            <div className="card-body">
               { products?.map((item, index) => (
                    <div key={index} className="card" onClick={() => selectItemManager(item)}>
                        <Image className='product-img' src={imageStreamer(item.productImgKey)} alt={item.productName}/>
                        <p className='name'>{item.productName}</p>
                        <p className='price'>Ksh. {item.price}</p>
                        <p className='quantity'>per kg</p>
                        <div className='add'>
                            <Image src={Images.addIcon}  alt='add'/>
                            <Image src={Images.cartIcon}  alt='add'/>
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