"use client";
import Link from "next/link";
import React from "react";
interface MenuItemProps {
  label: string;
  onClick: ()=>void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div className="w-full bg-white hover:bg-bnb-hover px-4 py-2 text-black">
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default MenuItem;
