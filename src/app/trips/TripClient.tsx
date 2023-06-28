"use client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import ListingCard from "../components/ListingCard";

const TripClient = ({
  reservations,
  currentUser,
}: {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}) => {
  return (
    <div className="flex flex-col gap-7 w-full py-28 px-[100px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-black font-bold text-3xl">Trips</h2>
        <p className="text-neutral-500">
          Where you&apos;ve been and where you&apos;re going{" "}
        </p>
      </div>
      <div className="flex flex-wrap gap-10 w-full items-start justify-center">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            currentUser={currentUser}
            reservation={reservation}
          />
        ))}
      </div>
    </div>
  );
};

export default TripClient;
