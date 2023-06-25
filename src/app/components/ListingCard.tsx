"use client";
import React from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useCountries from "../hooks/useCountries";
interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
}
const ListingCard: React.FC<ListingCardProps> = ({ data, currentUser }) => {
  const hasFavorited = false;
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  return (
    <button
      className="flex flex-col gap-0.5"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div
        className="w-[270px] z-20 relative aspect-square 
            h-[270px] rounded-lg overflow-hidden mb-1"
      >
        <Image
          src={data.imageSrc}
          alt={data.title}
          width={1920}
          height={1080}
          className="hover:scale-110  object-center object-cover rounded-lg transition w-full h-full"
        ></Image>
        <button className="hover:opacity-80 transition ">
          <AiOutlineHeart
            size={28}
            className="fill-white absolute top-[15px] right-[15px]"
          />
          <AiFillHeart
            size={24}
            className={`${
              hasFavorited
                ? "fill-rose-500 text-rose-500"
                : "fill-neutral-500/70"
            } top-[17px] right-[17px] absolute`}
          />
        </button>
      </div>
      <h4 className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </h4>
      <p className="font-light text-neutral-500">{data.category}</p>
      <p className="font-semibold">${data.price}</p>
    </button>
  );
};

export default ListingCard;
