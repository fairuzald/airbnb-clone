"use client";
import Link from "next/link";
import React from "react";
interface MenuItemProps {
  label: string;
  url: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, url }) => {
  return (
    <div className="w-full bg-white hover:bg-[#F7F7F7] px-4 py-2 text-black">
      <Link href={url}>{label}</Link>
    </div>
  );
};

export default MenuItem;
