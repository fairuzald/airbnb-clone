"use client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import ListingCard from "../components/ListingCard";

const PropertiesClient = ({
  data,
  currentUser,
}: {
  currentUser?: SafeUser | null;
  data: SafeListing[];
}) => {
  return (
    <div className="flex flex-col gap-7 w-full py-28 px-[100px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-black font-bold text-3xl">Properties</h2>
        <p className="text-neutral-500">
          List of your properties
        </p>
      </div>
      <div className="flex flex-wrap gap-10 w-full items-start justify-center">
        {data.map((item) => (
          <ListingCard
            key={item.id}
            data={item}
            currentUser={currentUser}
            isProperties
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesClient;
