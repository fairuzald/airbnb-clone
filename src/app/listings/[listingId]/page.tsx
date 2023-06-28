import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { notFound } from "next/navigation";
import React from "react";
import ListClient from "./ListClient";
import getReservations from "@/app/actions/getReservations";
export const dynamic = 'force-dynamic'

const ListingDetail = async ({
  params,
}: {
  params: { listingId?: string };
}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return notFound();
  }
  return (
    <main className="min-h-screen flex w-full  flex-col">
      <ListClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </main>
  );
};

export default ListingDetail;
