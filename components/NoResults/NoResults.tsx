"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Images } from "../../constants";
import "./NoResults.scss";

interface NoResultsProps {
  searchValue?: any,
  backLink: string
}

const NoResults = ({ searchValue, backLink }: NoResultsProps) => {
  const navigator = useRouter();
  
  return (
    <div className="app__no_results h-[70vh] sm:mt-[8.5rem] mt-[7.5rem] mb-[3rem] px-2">
      <Image src={Images.binoculars} alt="binoculars" width={170} priority={true}/>

      <div>
        <h2>
          No Results Found for <span>{`"${searchValue}"`}</span>
        </h2>
        <h2>Tips:</h2>
        <ul className="list-disc">
          <li>Make sure that all words are spelled correctly.</li>
          <li>Try searching with short and simple keywords.</li>
          <li>Try different keywords.</li>
        </ul>
        <button onClick={()=>{ navigator.push(backLink) }}>Try Again</button>
      </div>
    </div>
  );
};

export default NoResults;
