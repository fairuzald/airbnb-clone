import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { notFound } from "next/navigation";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../actions/getFavoriteListing";
export const dynamic = 'force-dynamic'

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavoriteListings();
  if (!currentUser || favorites.length === 0) {
    return notFound();
  }
  return (
    <main className="min-h-screen flex w-full  flex-col text-black">
        <FavoritesClient currentUser={currentUser} data={favorites}/>
    </main>
  );
};

export default FavoritesPage;
