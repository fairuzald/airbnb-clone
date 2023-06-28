import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { notFound } from "next/navigation";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({ userId: currentUser?.id });
  if (!currentUser || listings.length === 0) {
    return notFound();
  }
  return (
    <main className="min-h-screen flex w-full  flex-col text-black">
      <PropertiesClient currentUser={currentUser} data={listings} />
    </main>
  );
};

export default FavoritesPage;
