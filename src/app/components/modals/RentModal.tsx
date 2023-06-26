"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modals from "./Modals";
import Button from "../Button";
import CrossIcon from "../icons/CrossIcon";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../steps/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../steps/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../steps/Counter";
import ImageUpload from "../steps/ImageUpload";
import TextFields from "../TextFields";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  // Form state and methods
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // Watch form fields
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const title = watch("title");
  const description = watch("description");
  const price = watch("price");

  // Set custom form field value
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // Step state
  const [step, setStep] = useState(STEPS.CATEGORY);

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Go to the next step
  const Next = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // Go to the previous step
  const Prev = () => {
    setStep((value) => value - 1);
  };

  // Close rent modal
  const onClose = useCallback(() => {
    rentModal.onClose();
  }, [rentModal]);

  // router
  const router = useRouter();

  // Submit form rent modal
  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      if (step !== STEPS.PRICE) {
        return Next();
      }

      setIsLoading(true);
      axios
        .post("/api/listings", data)
        .then(() => {
          toast.success("Success created your rent data!");
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.onClose();
        })
        .catch((err) => {
          toast.error("Error creating rent");
        })
        .finally(() => setIsLoading(false));
    },
    [step, Next, setIsLoading, router, reset, setStep, rentModal]
  );

  // Dynamically load the Map component
  const Map = useMemo(
    () =>
      dynamic(() => import("../steps/Map"), {
        ssr: false,
      }),
    [location]
  );

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
    [STEPS.CATEGORY]: {
      title: "Which of these best describes your place?",
      subtitle: "Pick a category",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2 max-h-[50vh] overflow-y-auto">
          {categories.map((item, index) => (
            <CategoryInput
              key={index}
              label={item.label}
              icon={item.icon}
              onClick={(categorySelected) => {
                setCustomValue(
                  "category",
                  category === item.label ? "" : categorySelected
                );
              }}
              selected={category === item.label}
            />
          ))}
        </div>
      ),
    },
    [STEPS.LOCATION]: {
      title: "Where is your place located?",
      subtitle: "Help guests find you",
      content: (
        <div className="relative flex flex-col items-center w-full justify-center">
          <CountrySelect
            value={location}
            onChange={(selectedLocation) => {
              setCustomValue("location", selectedLocation);
            }}
          />
          <Map center={location?.latlng} />
        </div>
      ),
    },
    [STEPS.INFO]: {
      title: "Share basics about your place",
      subtitle: "What amenities do you have?",
      content: (
        <div className="flex flex-col items-center w-full justify-center">
          <Counter
            title="Guests"
            subtitle="How many guests do you allow?"
            value={guestCount}
            onChange={(value) => {
              setCustomValue("guestCount", value);
            }}
          />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => {
              setCustomValue("roomCount", value);
            }}
          />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => {
              setCustomValue("bathroomCount", value);
            }}
            lastItem
          />
        </div>
      ),
    },
    [STEPS.IMAGES]: {
      title: "Add a photo of your place",
      subtitle: "Show guests what your place looks like!",
      content: (
        <div className="flex flex-col items-center w-full justify-center">
          <ImageUpload
            url={imageSrc}
            onChange={(url) => {
              setCustomValue("imageSrc", url);
            }}
          />
        </div>
      ),
    },
    [STEPS.DESCRIPTION]: {
      title: "How would you describe your place?",
      subtitle: "Short and sweet works best!",
      content: (
        <div className="flex flex-col items-center gap-3 w-full justify-center">
          <TextFields
            value={title}
            onChange={(e) => setCustomValue("title", e)}
            id="title"
            label="Title"
            errors={errors}
            register={register}
            required
          />
          <TextFields
            textarea
            value={description}
            onChange={(e) => setCustomValue("description", e)}
            id="description"
            label="Description"
            errors={errors}
            register={register}
            required
          />
        </div>
      ),
    },
    [STEPS.PRICE]: {
      title: "Now, set your price",
      subtitle: "How much do you charge per night?",
      content: (
        <div className="flex flex-col items-center gap-3 w-full justify-center">
          <TextFields
            formatPrice
            type="text"
            value={price}
            onChange={(e) => setCustomValue("price", e)}
            label="Price"
            id="price"
            errors={errors}
            register={register}
            required
          />
        </div>
      ),
    },
  };

  // Generate button based on the current step
  const button = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return (
        <Button color="red" onClick={handleSubmit(onSubmit)}>
          Next
        </Button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2">
        <Button color="white" onClick={Prev}>
          Back
        </Button>
        <Button color="red" onClick={handleSubmit(onSubmit)}>
          {step === STEPS.PRICE ? "Create" : "Next"}
        </Button>
      </div>
    );
  }, [step, onSubmit, handleSubmit]);

  // Header component for the modal
  const header = (
    <div className="flex w-full items-center px-5 border-b border-b-bnb-border pb-3">
      <button
        className="bg-transparent rounded-full hover:bg-bnb-hover p-2"
        onClick={onClose}
      >
        <CrossIcon style="w-4 h-4 fill-black" />
      </button>
      <p className="text-black font-bold text-lg flex-1 flex items-center justify-center"></p>
    </div>
  );

  // Body component for the modal
  const body = (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-3 w-full">
        <h4 className="text-xl font-bold text-black">
          {bodyContent[step].title}
        </h4>
        <p className="text-bnb-soft-gray">{bodyContent[step].subtitle}</p>
      </div>
      {bodyContent[step].content}
      {button}
    </div>
  );

  return <Modals isOpen={rentModal.isOpen} header={header} body={body} />;
};

export default RentModal;
