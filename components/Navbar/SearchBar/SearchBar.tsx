import React from "react";
import "./SearchBar.scss";
import Image from "next/image";
import { Images } from "@/constants";

interface SearchBarProps {
    query: string,
    setQuery: (event: string) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    search: () => void
}

const SearchBar = ({ query, handleInputChange, search } : SearchBarProps) => {
        
    return (
        <div className="app__searchBar">
            <input type='text' value={query} onChange={handleInputChange} placeholder='Search product or category '/>
            <button onClick={()=>search()}><Image src={Images.searchIcon} alt="search-icon" height={30}/></button>
        </div>
    );
}
 
export default SearchBar;