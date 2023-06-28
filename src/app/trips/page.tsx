import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { notFound } from "next/navigation";
import TripClient from "./TripClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ userId: currentUser?.id });
  if (!currentUser || reservations.length === 0) {
    return notFound();
  }
  return (
    <main className="min-h-screen flex w-full  flex-col text-black">
      <TripClient currentUser={currentUser} reservations={reservations} />
    </main>
  );
};

export default TripsPage;
