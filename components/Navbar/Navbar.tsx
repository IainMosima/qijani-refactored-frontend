"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Images } from "../../constants";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { userLogin, userLogout } from "@/redux/reducers/loginReducer";
import { getMyPackages } from "@/redux/reducers/packagesReducer";
import { store } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../../models/product";
import * as ProductsApi from "../../network/products";
import * as UserApi from "../../network/users";
import "./Navbar.scss";
import SearchBar from "./SearchBar/SearchBar";
import { getMyOrders } from "@/redux/reducers/OrdersReducer";
import { Avatar } from "@mui/material";
import stringAvatar from "../../utils/stringToColor";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.login.user);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categoryToggle, setcategoryToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const [resultAvailable, setResultAvailable] = useState(searchResults.length > 0 ? true : false);
  const navigate = useRouter();

  const myAccount = [
    {
      img: Images.profileDefault,
      name: "My Profile",
    },
    // {
    //     img: Images.orderIcon,
    //     name: 'Orders'
    // }
    // will add inbox later on
  ];

  useEffect(() => {
    async function perfomSearch() {
      const results = await ProductsApi.searchFunction(debouncedQuery);
      setSearchResults(results);
      setResultAvailable(true);

    }

    if (debouncedQuery) {
      perfomSearch();
    }

    async function checkLoggedInUser() {
      const user = await UserApi.getLoggedInUser();
      if (user) {
        dispatch(userLogin(user));
        store.dispatch(getMyPackages);
        store.dispatch(getMyOrders);
      }
    }
    checkLoggedInUser();
    return () => {
      setSearchResults([]);
    };
  }, [debouncedQuery, dispatch]);

  function clear() {
    setQuery('');
    setResultAvailable(false);
  }

  function search() {
    navigate.push(`/search/${query}`);
    setResultAvailable(false);
  }

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  async function logout() {
    try {
      await UserApi.logout();
      dispatch(userLogout());
    } catch (error) {
      console.error(error);
    }
  }

  function toggleHandler(option?: string) {
    switch (option) {
      case "categories":
        setcategoryToggle(!categoryToggle);
        setAccountToggle(false);

        break;

      case "myAccount":
        setAccountToggle(!accountToggle);
        setcategoryToggle(false);
        break;

      case "none":
        setAccountToggle(false);
        setcategoryToggle(false);

        break;
    }
  }

  function packageOnClickHandler() {
    if (!loggedInUser) {
      navigate.push("/loginSignup?message=packages");
    } else {
      navigate.push("/packages");
    }
  }

  function orderOnClickHandler() {
    if (!loggedInUser) {
      navigate.push("/loginSignup?message=orders");
    } else {
      navigate.push("/orders");
    }
  }

  return (
    <nav className="flex justify-evenly items-center w-full py-2 app__navbar bg-white z-20">
      <div className="basis-1/6">
        <Link href="/">
          <Image
            src={Images.logo}
            alt="logo"
            className="logo sm:w-[10rem]"
            height={70}
            priority={true}
          />
        </Link>
      </div>

      <div className="app__searchBar basis-[47%]">
        <SearchBar
          query={query}
          handleInputChange={handleSearchInput}
          setQuery={function (event: string): void {
            throw new Error("Function not implemented.");
          }}
          setResultAvailable={setResultAvailable}
          search={search}
          clear={clear}
        />

        {resultAvailable && searchResults.length > 0 && (
          <div className="search-results lg:left-[8.5rem]">
            <ul className="lg:w-[30rem] md:w-[23rem] w-[13rem]">
              {searchResults.map((item, index) => (
                <div
                  onClick={() => {
                    navigate.push(`/search/${item.productName}`);
                    setSearchResults([]);
                  }}
                  key={index}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <li>{item.productName}</li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="app__navbar-links ml-3">
      <div onClick={() => navigate.push('/')}>
          <Image
            src={Images.homeIcon}
            alt="package-icon"
            className="icon"
            width={35}
          />
          <h4>Home</h4>
        </div>

        <div onClick={() => packageOnClickHandler()}>
          <Image
            src={Images.packagesIcon}
            alt="package-icon"
            className="icon"
            width={35}
          />
          <h4>Packages</h4>
        </div>

        <div onClick={() => orderOnClickHandler()}>
          <Image
            src={Images.orderIcon}
            alt="order-icon"
            className="icon"
            width={35}
          />
          <h4>Orders</h4>
        </div>


        {loggedInUser === null ? (
          <Link
            href={"/loginSignup"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div>
              <Image
                src={Images.profileDefault}
                alt="account-icon"
                className="profile-icon"
                priority={true}
                width={40}

              />
              <h4>My Account </h4>
            </div>
          </Link>
        ) : (
          <div onClick={() => toggleHandler("myAccount")}>
            <div className="flex justify-start place-items-center gap-2">
              <Avatar {...stringAvatar(loggedInUser.username)} />

              <div className="flex justify-start place-items-center h-full gap-1">
                <h4>{loggedInUser.username}</h4>
                <Image src={Images.dropDownIcon} alt="drop-icon" width={10} priority={true} />
              </div>
            </div>

            {accountToggle && (
              <motion.div
                whileInView={{ y: [0, 10] }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="more_info my_account right-2"
              >
                <ul>
                  {myAccount.map((item, index) => (
                    <li key={index} onClick={() => navigate.push('/profile')}>
                      {<Image src={item.img} alt="my-profile-icon" priority={true} width={30} />}{" "}
                      {item.name}
                    </li>
                  ))}

                  <hr />
                  <button
                    className="link"
                    style={{ paddingTop: 0 }}
                    onClick={logout}
                  >
                    Log Out
                  </button>
                </ul>
              </motion.div>
            )}
          </div>
        )}
      </div>
      {/* For Mobile */}
      {loggedInUser === null ? (
        <Link
          href={"/loginSignup"}
          style={{ textDecoration: "none", color: "black" }}
          className="lg:hidden inline-block"
        >
          <Image
            src={Images.profileDefault}
            alt="account-icon"
            className="profile-icon"
            width={40}
          />
        </Link>
      ) : (
        <div
          onClick={() => toggleHandler("myAccount")}
          className="lg:hidden relative"
        >
          <Avatar {...stringAvatar(loggedInUser.username)} />

          {accountToggle && (
            <motion.div
              whileInView={{ y: [0, 10] }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="bg-white border w-[10rem] absolute right-[0.1rem] p-3 rounded-[10px] border-black"
            >
              <ul className="flex justify-center place-items-center flex-col rounded-[10px] gap-3">
                {myAccount.map((item, index) => (
                  <li key={index} className="flex place-items-center gap-3" onClick={() => navigate.push('/profile')}>
                    <Image src={item.img} alt="my-profile-icon" width={33} priority={true} />{" "}
                    {item.name}
                  </li>
                ))}

                <button
                  className="bg-green text-yellow rounded-md w-full h-[2.5rem]"
                  style={{ paddingTop: 0 }}
                  onClick={logout}
                >
                  Log Out
                </button>
              </ul>
            </motion.div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
