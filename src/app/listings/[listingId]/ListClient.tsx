"use client";
import Avatar from "@/app/components/Avatar";
import { categories } from "@/app/components/navbar/Categories";
import useCountries from "@/app/hooks/useCountries";
import useFavorites from "@/app/hooks/useFavorites";
import { SafeListing, SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useMemo } from "react";
import { IconType } from "react-icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const ListClient = ({
  listing,
  currentUser,
}: {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(listing.locationValue);
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/steps/Map"), {
        ssr: false,
      }),
    [location]
  );
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);
  const Icon: IconType | undefined = category?.icon;
  const { hasFavorited, toggleFavorite } = useFavorites({
    currentUser,
    listingId: listing.id,
  });
  return (
    <div className="flex flex-col gap-7 w-full py-28 px-[400px]">
      {/* Listing Head */}
      <div className="flex flex-col w-full gap-3">
        <h2 className="font-bold text-black text-3xl">{listing.title}</h2>
        <p className="font-light text-neutral-500 text-base">
          {location?.region},{location?.label}
        </p>
        <div className="relative flex w-full h-[500px]">
          <Image
            src={listing.imageSrc}
            alt={listing.title}
            width="1920"
            height="1080"
            className="object-cover object-center overflow-hidden w-full h-full rounded-xl"
          />
          <button
            className="hover:opacity-80 transition"
            onClick={(e) => toggleFavorite(e)}
          >
            <AiOutlineHeart
              size={28}
              className="fill-white absolute top-[35px] right-[42px]"
            />
            <AiFillHeart
              size={24}
              className={`${
                hasFavorited
                  ? "fill-rose-500 text-rose-500"
                  : "fill-neutral-500/70"
              } top-[37px] right-[44px] absolute`}
            />
          </button>
        </div>
      </div>
      {/* Listing Info*/}
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col w-full gap-1">
          <div className="flex gap-2 ">
            <p className=" font-bold text-black"> {listing.user.name}</p>
          </div>
          <div className="flex gap-3 text-neutral-500 font-semibold">
            <p>{listing.guestCount} guests</p>
            <p>{listing.roomCount} rooms</p>
            <p>{listing.bathroomCount} bathrooms</p>
          </div>
        </div>
        <div className="h-[50px] w-[50px] aspect-square">
          <Avatar image={listing.user.image} fullWidth />
        </div>
      </div>
      <hr className="w-full border border-bnb-border px-10" />
      {/* Listing category */}
      <div className="flex items-center gap-4">
        {Icon && <Icon size={24} />}
        <div className="flex flex-col gap-1">
          <p className="text-black font-bold text-lg">{category?.label}</p>
          <p className="text-neutral-500 font-light text-base">
            {category?.description}
          </p>
        </div>
      </div>
      <hr className="w-full border border-bnb-border px-10" />
      {/* Listing Description */}
      <p className="text-neutral-500 text-base font-semibold">
        {listing.description}
      </p>
      <hr className="w-full border border-bnb-border px-10" />
      {/* Map */}
      <Map center={location?.latlng} size="large"></Map>
    </div>
  );
};

export default ListClient;
