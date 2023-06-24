"use client"
import React from "react";
import { IconType } from "react-icons";
interface CategoryInputProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  onClick: (label: string) => void;
}
const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  icon:Icon,
  selected,
  onClick,
}) => {
  return (
    <button
      onClick={() => onClick(label)}
      className={`${
        selected ? "border-black" : "border-neutral-200"
      } text-black rounded-md hover:border-black  border-2 cursor-pointer py-2 px-4 flex flex-col gap-3 transition`}
    >
      <Icon/>
      {label}
    </button>
  );
};

export default CategoryInput;
