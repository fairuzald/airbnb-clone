"use client";
import React, { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";
declare global {
  var cloudinary: any;
}
const ImageUpload = ({
  url,
  onChange,
}: {
  url: string;
  onChange: (url: string) => void;
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        function handleOnClick(e: any) {
          e.preventDefault();
          open?.();
        }
        return (
          <button
            className="relative w-full flex flex-col h-[300px] border-dashed border-gray-800 border-2 hover:opacity-70 transition p-10 gap-4 text-gray-800 rounded-md items-center justify-center"
            onClick={handleOnClick}
          >
            <TbPhotoPlus size={45} />
            <p className="font-semibold text-base">Click to Upload</p>
            {url && (
              <Image
                src={url}
                alt="Image Upload"
                fill
                className="object-cover object-center overflow-hidden absolute inset-0 w-full h-full"
              />
            )}
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
