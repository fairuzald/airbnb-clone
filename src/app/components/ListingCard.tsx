"use client";
import React, { MouseEventHandler, useCallback, useMemo } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import useCountries from "../hooks/useCountries";
import useFavorites from "../hooks/useFavorites";
import { format } from "date-fns";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: SafeReservation;
}
const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
  reservation,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorites({
    currentUser,
    listingId: data.id,
  });
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [data.price, reservation]);
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const onCancelReservation = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if(!reservation || !reservation.id){
      return toast.error("Not found reservation ID")
    }
    axios
      .delete(
        `/api/reservations/${
        reservation.id
        }`
      )
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      });
  }, [router]);

  return (
    <button
      className="flex flex-col gap-0.5"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="w-[270px] relative aspect-square h-[270px] rounded-lg overflow-hidden mb-1">
        <Image
          src={data.imageSrc}
          alt={data.title}
          width={1920}
          height={1080}
          className="hover:scale-110 object-center object-cover rounded-lg transition overflow-hidden w-full h-full"
        ></Image>
        <button
          className="hover:opacity-80 transition"
          onClick={(e) => toggleFavorite(e)}
        >
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
      <p className="font-light text-neutral-500">
        {reservationDate || data.category}
      </p>
      <p className="font-semibold">
        ${price} {!reservation && " / night"}
      </p>
      {reservation && (
        <Button color="red" size="small" onClick={(e: React.MouseEvent<HTMLButtonElement>)=>{onCancelReservation(e)}}>
          Cancel Reservation
        </Button>
      )}
    </button>
  );
};

export default ListingCard;
