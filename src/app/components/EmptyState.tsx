"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  resetButton?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  resetButton,
}) => {
  const router = useRouter();
  
  return (
    <main className="flex items-center justify-center w-full min-h-screen gap-5 pt-[200px] flex-col">
      <h2 className="text-black">{title}</h2>
      <p className="text-neutral-500">{subtitle}</p>
      {resetButton && (
        <div className="w-52">
          <Button color="white" onClick={() => router.push("/")}>
            Remove all filters
          </Button>
        </div>
      )}
    </main>
  );
};

export default EmptyState;
