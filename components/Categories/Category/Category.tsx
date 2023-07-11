import Image from "next/image";
import { Images } from "@/constants";
import { Product } from "@/models/product";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import "./Category.scss";
import { useAppDispatch } from "@/hooks/reduxHook";
import { selectCategory } from "@/redux/reducers/selectedCategoryReducer";

interface CategoryProps {
  categoryName: string;
  query: string;
  products: Product[] | undefined;
  loggedInUser: User | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

const Category = ({
  categoryName,
  products,
  loggedInUser,
  setSelectedProduct,
  setOpen,
  setPrice,
}: CategoryProps) => {
  const navigate = useRouter();
  const dispatch = useAppDispatch();
  function selectItemManager(product: Product) {
    if (loggedInUser) {
      setSelectedProduct(product);
      setOpen(true);
      setPrice(product.price);
    } else {
      navigate.push("/loginSignup/add");
    }
  }

  return (
    <div className="app__card">
      <div className="card-title">
        <div className="basis-[4rem]"/>
        <h3 className="lg:text-[1.1rem] md:text-[1.3rem] text-[1rem] font-bold">{categoryName}</h3>
        <div className="lg:basis-[80%] md:basis-[53%] basis-[37%]"/>
        <section className="seeAll" onClick={() => dispatch(selectCategory(categoryName))}>
          <h4 className="lg:text-[1.1rem] md:text-[1.3rem] text-[1rem] ml-1">
            See all <Image src={Images.nextIcon} alt="next" />{" "}
          </h4>
        </section>
        <div className="basis-[4rem]"/>
      </div>
      <hr />
      <br />

      <div className="card-body grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products?.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => selectItemManager(item)}
          >
            <Image
              className="product-img"
              src={`${process.env.NEXT_PUBLIC_PRODUCTSBUCKET}/${item.productImgKey}`}
              alt={item.productName}
              width={100}
              height={100}
            />
            <p className="name">{item.productName}</p>
            <p className="price">Ksh. {item.price}</p>
            <p className="quantity">per kg</p>
            <div className="add">
              <Image src={Images.addIcon} alt="add" />
              <Image src={Images.cartIcon} alt="add" />
            </div>
          </div>
        ))}
      </div>

      <br />
      <hr />
    </div>
  );
};

export default Category;
