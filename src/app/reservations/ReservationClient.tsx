"use client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import ListingCard from "../components/ListingCard";

const ReservationClient = ({
  reservations,
  currentUser,
}: {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}) => {
  return (
    <div className="flex flex-col gap-7 w-full py-28 px-[100px]">
      <div className="flex flex-col gap-3">
        <h2 className="text-black font-bold text-3xl">Reservations</h2>
        <p className="text-neutral-500">
          Booking on your properties
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

export default ReservationClient;
