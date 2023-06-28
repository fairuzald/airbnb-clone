"use client";
import React, { useMemo } from "react";
import SearchIcon from "../icons/SearchIcon";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { differenceInDays } from "date-fns";

const Search = () => {
  const params = useSearchParams();
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");

  const { getByValue } = useCountries();
  const location = getByValue(params?.get("locationValue") as string);
  const durationLabel = useMemo(() => {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);
    const diff = differenceInDays(end, start);
    if (!startDate && !endDate) {
      return "Any Weeks";
    }
    if (diff === 0 || diff === 1) {
      return `1 day`;
    }
    return `${diff} days`;
  }, [startDate, endDate]);
  const searchModal = useSearchModal();
  return (
    <div className="flex py-1 px-3 mx-auto rounded-full w-full md:w-auto border border-bnb-border shadow-sm hover:shadow-md transition cursor-pointer font-semibold">
      <button
        onClick={searchModal.onOpen}
        className="flex items-center justify-center py-0.5"
      >
        <div className="flex border-r px-4">
          <p className="text-black">{location?.label || "Anywhere"}</p>
        </div>
        <div className="flex border-r px-4">
          <p className="text-black">{durationLabel}</p>
        </div>
        <div className="flex items-center justify-center gap-3 px-4">
          <p className="text-bnb-soft-gray">
            {guestCount
              ? parseInt(guestCount) === 1
                ? "1 Guest"
                : guestCount + " Guests"
              : "Add Guests"}
          </p>
          <button className="p-2 bg-bnb-red  rounded-full ">
            <SearchIcon style="fill-white w-4 h-4" />
          </button>
        </div>
      </button>
    </div>
  );
};

export default Search;
