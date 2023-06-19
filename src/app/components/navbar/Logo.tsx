"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="object-center object cover overflow-hidden hidden md:block">
      <Image src="/logo.png" alt="Logo Airbnb" width={1200} height={375} className="w-[100px] h-[30px] object-center object cover overflow-hidden"/>
    </Link>
  );
};

export default Logo;
