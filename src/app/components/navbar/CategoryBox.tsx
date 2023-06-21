"use client";
import React from "react";
import { IconType } from "react-icons";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  // Handle the click event on the category box
  const onClick = useCallback(() => {
    let query = {};

    // Parse the current search parameters
    if (params) {
      query = qs.parse(params.toString());
    }

    // Create an updated query object with the selected category
    const updatedQuery: any = {
      ...query,
      category: label,
    };

    // If the selected category is already active, remove it from the query
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Generate the new URL with the updated query parameters
    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );

    // Navigate to the new URL
    router.push(url);
  }, [label, params, router]);

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition  cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </button>
  );
};

export default CategoryBox;
