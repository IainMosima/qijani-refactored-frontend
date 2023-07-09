import React from "react";
import "./SearchBar.scss";
import Image from "next/image";
import { Images } from "@/constants";

interface SearchBarProps {
  query: string;
  setQuery: (event: string) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
}

const SearchBar = ({ query, handleInputChange, search }: SearchBarProps) => {
  return (
    <div className="app__searchBar">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="lg:w-[25rem] md:w-[22rem] w-[9.5rem] sm:h-[3rem] h-[2.5rem] sm:text-lg text-[12px] sm:pl-[1rem] pl-[.5rem]"
        placeholder="Search product or category "
      />
      <button 
        className="lg:w-[4.5rem] md:w-[4.5rem] w-[3.5rem] sm:h-[3rem] h-[2.5rem]"
        onClick={() => search()}
      >
        <Image src={Images.searchIcon} alt="search-icon" height={30} />
      </button>
    </div>
  );
};

export default SearchBar;
