import React from "react";
import "./SearchBar.scss";
import Image from "next/image";
import { Images } from "@/constants";

interface SearchBarProps {
  query: string;
  setQuery: (event: string) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: () => void;
  clear: () => void;
  setResultAvailable: React.Dispatch<React.SetStateAction<boolean>>;

}

const SearchBar = ({ query, handleInputChange, search, clear, setResultAvailable }: SearchBarProps) => {
  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      const searchButton = document.getElementById('searchButton') as HTMLButtonElement | null;
      if (searchButton) {
        searchButton.click();
        
      }

    }
  }
  function searchHandler() {
    search();
    setResultAvailable(false);
  }

  return (
    <div className="app__searchBar w-auto mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="lg:w-[40rem] md:w-[22rem] w-[11rem] sm:h-[3rem] h-[2.5rem] sm:text-lg text-[13px] sm:pl-[1rem] pl-[.7rem] relative"
        placeholder="Search product or category"
        onKeyDown={handleKeyPress}
      />
      {query.length > 0 &&
        <div
          className="absolute p-2 bg-green rounded-full sm:h-[1.7rem] sm:w-[1.7rem] h-[1.5rem] w-[1.5rem] lg:left-[37.5rem] md:left-[19.5rem] left-[9rem] sm:top-[9px] top-[8px] cursor-pointer flex justify-center place-items-center"
          onClick={() => clear()}>
          <Image src={Images.closeWhiteIcon} alt="close-white-icon" width={15} priority={true}/>
        </div>
      }
      <button
        className="lg:w-[4.5rem] md:w-[4.5rem] w-[3rem] sm:h-[3rem] h-[2.5rem]"
        id='searchButton'
        onClick={() => searchHandler()}
      >
        <Image src={Images.searchIcon} alt="search-icon" height={30} />
      </button>
    </div>
  );
};

export default SearchBar;
