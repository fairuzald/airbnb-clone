"use client";
import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <div className="w-fit h-fit">
      <Image
        src={"/defaultpp.jpg"}
        alt="Photo Profile User"
        width="360"
        height="360"
        className="object-center w-[30px] h-[30px] object-cover overflow-hidden rounded-full"
      />
    </div>
  );
};

export default Avatar;
