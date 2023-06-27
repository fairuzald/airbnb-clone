"use client";
import Avatar from "@/app/components/Avatar";
import Calendar from "@/app/components/Calendar";
import { categories } from "@/app/components/navbar/Categories";
import useCountries from "@/app/hooks/useCountries";
import useFavorites from "@/app/hooks/useFavorites";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { IconType } from "react-icons";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Range } from "react-date-range";
import Button from "@/app/components/Button";
const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const ListClient = ({
  listing,
  currentUser,
  reservations=[],
}: {
  listing: SafeListing & { user: SafeUser };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}) => {
  // useCountries hook
  const { getByValue } = useCountries();

  // Get location using getByValue function
  const location = getByValue(listing.locationValue);

  // router
  const router = useRouter();

  // Memoize the Map component using dynamic import
  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/components/steps/Map"), {
        ssr: false,
      }),
    [location]
  );

  // Find the category based on the listing's category label
  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  // Assign the Icon component based on the category's icon
  const Icon: IconType | undefined = category?.icon;

  // useFavorites hook
  const { hasFavorited, toggleFavorite } = useFavorites({
    currentUser,
    listingId: listing.id,
  });

  // Compute disabledDates using reservations
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  // isLoading state
  const [isLoading, setIsLoading] = useState(false);

  // State to display the date has been selected
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // Total price based on date
  const [totalPrice, setTotalPrice] = useState(listing.price);

  // Login modal state
  const loginModal = useLoginModal();

  // FUnction to handle reservation submit button
  const onReservationSubmit = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservations", {
        listingId: listing?.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      })
      .then(() => {
        toast.success("Reservation succesfully created!");
        setDateRange(initialDateRange);
        router.refresh();
      })
      .catch((error) => {
        toast.error("Failed to create reservation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange, loginModal, listing?.id, router, totalPrice]);

  // Handle change price based on Date action
  useEffect(() => {
    let dayCount = 1;
    if (dateRange.startDate && dateRange.endDate) {
      dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
    }
    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    } else {
      setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

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
      {/* Container LIsting details */}
      <div className="flex w-full gap-10">
        {/* LIsting details */}
        <div className="flex flex-col gap-7 w-7/12">
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
          <Map center={location?.latlng} size="large" />
        </div>
        {/* Listing Reservation */}
        <div className="flex flex-col text-black flex-1 items-center">
          {/* Container FUll reservation calendar div */}
          <div className="flex flex-col border-bnb-border border rounded-lg">
            {/* Price per night */}
            <div className="px-4 py-2 text-left flex items-end">
              <p className="text-black text-xl font-bold">
                $ {listing?.price}{" "}
                <span className="text-neutral-500 text-base font-light">
                  / night
                </span>
              </p>
            </div>
            <hr className="w-full border border-bnb-border" />

            {/* Calendar */}
            <Calendar
              disabledDates={disabledDates}
              onChange={(value) => {
                setDateRange(value.selection as Range);
              }}
              value={dateRange}
            />
            <hr className="w-full border border-bnb-border" />
            <div className="w-full px-5 py-3">
              <Button color="red" onClick={onReservationSubmit}>
                Reserve
              </Button>
            </div>
            {/* Total price */}
            <div className="flex px-4 py-2 justify-between">
              <p className="text-black font-bold">Total</p>
              <p className="text-black font-bold">$ {totalPrice}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListClient;
