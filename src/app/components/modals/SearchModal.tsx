"use client";
import React, { useCallback, useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import Modals from "./Modals";
import CrossIcon from "../icons/CrossIcon";
import TextFields from "../TextFields";
import Button from "../Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import GoogleIcon from "../icons/GoogleIcon";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import GithubIcon from "../icons/GithubIcon";
import useSearchModal from "@/app/hooks/useSearchModal";
import { DateRange, Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../steps/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calendar from "../Calendar";
import Counter from "../steps/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useParams();
  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const Map = useMemo(
    () => dynamic(() => import("../steps/Map"), { ssr: false }),
    [location]
  );

  // Close login modal
  const onClose = useCallback(() => {
    searchModal.onClose();
  }, [searchModal]);

  const onNext = useCallback(() => {
    setSteps((prev) => prev + 1);
  }, []);
  const onBack = useCallback(() => {
    setSteps((prev) => prev - 1);
  }, []);

  const onSubmit = useCallback(async () => {
    let query: any = {};
    if (params) {
      query = qs.parse(params.toString());
    }
    const updatedQuery = {
      ...query,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location?.value,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setSteps(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    router,
    searchModal,
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    params,
    roomCount,
  ]);

  // Body content for each step
  const bodyContent: {
    [key in STEPS]: {
      title: string;
      subtitle: string;
      content: React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      >;
    };
  } = {
    [STEPS.LOCATION]: {
      title: "Where do you wanna go?",
      subtitle: "Find the perfect location",
      content: (
        <div className="relative flex flex-col items-center w-full justify-center">
          <CountrySelect
            value={location}
            onChange={(selectedLocation) => {
              setLocation(selectedLocation);
            }}
          />
          <Map center={location?.latlng} />
        </div>
      ),
    },

    [STEPS.DATE]: {
      title: "When do you plan to go?",
      subtitle: "Make sure everyone is free",
      content: (
        <div className="flex flex-col items-center w-[calc(100%-7px)] justify-center">
          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      ),
    },
    [STEPS.INFO]: {
      title: "More information",
      subtitle: "Find your perfect place!",
      content: (
        <div className="flex flex-col items-center w-full justify-center">
          <Counter
            value={guestCount}
            title="Guests"
            subtitle="How many guests are coming?"
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you need?"
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            onChange={(value) => setbathroomCount(value)}
          />
         
        </div>
      ),
    },
  };

  // Generate button based on the current step
  const button = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return (
        <Button color="red" onClick={onNext}>
          Next
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2">
        <Button color="white" onClick={onBack}>
          Back
        </Button>
        <Button color="red" onClick={steps === STEPS.INFO ? onSubmit : onNext}>
          {steps === STEPS.INFO ? "Search" : "Next"}
        </Button>
      </div>
    );
  }, [onBack, onNext, onSubmit, steps]);

  // Header component for the modal
  const header = (
    <div className="flex w-full items-center px-5 border-b border-b-bnb-border pb-3">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-black" />
      </button>
      <p className="text-black font-bold text-lg flex-1 flex items-center justify-center">
        Filters
      </p>
    </div>
  );

  // Body component for the modal
  const body = (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-3 w-full">
        <h4 className="text-xl font-bold text-black">
          {bodyContent[steps].title}
        </h4>
        <p className="text-bnb-soft-gray">{bodyContent[steps].subtitle}</p>
      </div>
      {bodyContent[steps].content}
      {button}
    </div>
  );
  return <Modals isOpen={searchModal.isOpen} header={header} body={body} />;
};

export default SearchModal;
