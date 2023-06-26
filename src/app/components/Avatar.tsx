"use client";
import Image from "next/image";
import React from "react";
interface AvatarProps {
  image: string | null | undefined;
  fullWidth?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ image, fullWidth }) => {
  return (
    <div className={` ${
          fullWidth ? "w-full h-full" : "w-fit h-fit"
        }`}>
      <Image
        src={image || "/defaultpp.jpg"}
        alt="Photo Profile User"
        width="1920"
        height="1080"
        className={`object-center ${
          fullWidth ? "w-full h-full" : "w-[30px] h-[30px]"
        }  object-cover overflow-hidden rounded-full`}
      />
    </div>
  );
};

export default Avatar;
