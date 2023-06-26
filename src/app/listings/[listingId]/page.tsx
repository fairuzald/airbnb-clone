import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import { notFound } from "next/navigation";
import React from "react";
import ListClient from "./ListClient";

const ListingDetail = async ({
  params,
}: {
  params: { listingId?: string };
}) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return notFound();
  }
  return (
    <main className="min-h-screen flex w-full  flex-col">
      <ListClient listing={listing} currentUser={currentUser} />
    </main>
  );
};

export default ListingDetail;
