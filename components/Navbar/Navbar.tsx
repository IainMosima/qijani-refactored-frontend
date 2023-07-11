"use client";
import React, { useState, useEffect } from "react";
import { Images } from "../../constants";
import { useDebounce } from "use-debounce";
import { motion } from "framer-motion";

import SearchBar from "./SearchBar/SearchBar";
import * as ProductsApi from "../../network/products";
import * as UserApi from "../../network/users";
import "./Navbar.scss";
import { Product } from "../../models/product";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHook";
import { userLogout } from "@/redux/reducers/loginReducer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAvailableCategories } from "@/redux/reducers/categoriesReducer";
import { store } from "@/redux/store";
import { getMyPackages } from "@/redux/reducers/packagesReducer";

store.dispatch(getAvailableCategories);
store.dispatch(getMyPackages);

const Navbar = () => {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector((state) => state.login.user);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categoryToggle, setcategoryToggle] = useState(false);
  const [accountToggle, setAccountToggle] = useState(false);
  const resultAvailable = searchResults.length > 0 ? true : false;
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
    }

    if (debouncedQuery) {
      perfomSearch();
    }

    return () => {
      setSearchResults([]);
    };
  }, [debouncedQuery]);

  function search() {
    navigate.push(`/search/${query}`);
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
      navigate.push("/loginSignup/packages");
    } else {
      navigate.push("/packages");
    }
  }

  
  return (
    <nav className="flex justify-evenly items-center w-full py-2 app__navbar">
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

      <div className="app__searchBar">
        <SearchBar
          query={query}
          handleInputChange={handleSearchInput}
          setQuery={function (event: string): void {
            throw new Error("Function not implemented.");
          }}
          search={search}
        />

        {resultAvailable && (
          <div className="search-results">
            <ul>
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
        <div onClick={() => packageOnClickHandler()}>
          <Image
            src={Images.packagesIcon}
            alt="package-icon"
            className="icon"
          />
          <h4>Packages</h4>
        </div>

        <Link
          href={"/orders"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div>
            <Image src={Images.orderIcon} alt="package-icon" className="icon" />
            <h4>Orders</h4>
          </div>
        </Link>

        <Link
          href={"/loginSignup/&"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div>
            <Image
              src={Images.accountIcon}
              alt="account-icon"
              className="profile-icon"
            />
            <h4>My Account </h4>
          </div>
        </Link>

        {loggedInUser && (
          <div onClick={() => toggleHandler("myAccount")}>
            {loggedInUser.profileImageKey && (
              <Image
                src={loggedInUser.profileImageKey}
                alt="profile-pic"
                className="profile-icon"
              />
            )}

            {!loggedInUser.profileImageKey && (
              <Image
                src={Images.accountIcon}
                alt="profile-icon"
                className="profile-icon"
              />
            )}
            <h4>{loggedInUser.username}</h4>
            <Image src={Images.dropDownIcon} alt="drop-icon" />

            {accountToggle && (
              <motion.div
                whileInView={{ y: [0, 10] }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="more_info my_account"
              >
                <ul>
                  {myAccount.map((item, index) => (
                    <li key={index}>
                      {<Image src={item.img} alt="my-profile-icon" />}{" "}
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

      <Link
        href={"/loginSignup/&"}
        style={{ textDecoration: "none", color: "black" }}
        className="lg:hidden md:block sm:block"
      >
        <div>
          <Image src={Images.accountIcon} alt="account-icon" className="" />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
