"use client";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div className="flex py-1 px-3 mx-auto rounded-full w-full md:w-auto border border-bnb-border shadow-sm hover:shadow-md transition cursor-pointer font-semibold">
      <button
        onClick={searchModal.onOpen}
        className="flex items-center justify-center py-0.5"
      >
        <div className="flex border-r px-4">
          <p className="text-black">Every where</p>
        </div>
        <div className="flex border-r px-4">
          <p className="text-black">Any weeks</p>
        </div>
        <div className="flex items-center justify-center gap-3 px-4">
          <p className="text-bnb-soft-gray">Add guest</p>
          <button className="p-2 bg-bnb-red  rounded-full ">
            <SearchIcon style="fill-white w-4 h-4" />
          </button>
        </div>
      </button>
    </div>
  );
};

export default Search;
